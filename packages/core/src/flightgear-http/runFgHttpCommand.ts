import { buildFgExecWebSocketJson } from '../flightgear-properties/propertyListenerExec';
import { flightGearPropertyListenerWsUrl } from './httpBase';
import type { FgCommandArgChild, FgCommandArgsJson } from './types';

export type RunFgHttpCommandOptions = {
  /**
   * Same host as PropertyListener: {@code hostname} or {@code hostname:port} (no {@code ws://} / {@code http://}).
   */
  host: string;
  /** Registered fgcommand name (e.g. {@code timeofday}, {@code pause}). */
  command: string;
  /**
   * Optional JSON merged into the command’s argument node (same tree as old Phi / {@code POST /run.cgi} body).
   */
  args?: FgCommandArgsJson;
  signal?: AbortSignal;
};

/**
 * Runs a FlightGear fgcommand via the PropertyListener WebSocket {@code exec} verb — the same mechanism as
 * {@code POST /run.cgi?value=…} ({@code RunUriHandler.cxx}), but without relying on HTTP/CORS to {@code /run.cgi}.
 *
 * Server: {@code PropertyChangeWebsocket::handleExecCommand} in
 * {@code flightgear/src/Network/http/PropertyChangeWebsocket.cxx}.
 *
 * When you already have an open PropertyListener connection, prefer {@link sendFgExecCommand} on
 * {@link useFlightGearPanelPropertiesStore}.{@link sendPropertyListenerRaw} to avoid a second socket.
 *
 * @returns A synthetic {@link Response} with status 200 after the exec frame is sent (FlightGear does not reply with
 * command success/failure on this channel).
 */
export async function runFgHttpCommand(options: RunFgHttpCommandOptions): Promise<Response> {
  if (options.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  const url = flightGearPropertyListenerWsUrl(options.host);
  const payload = buildFgExecWebSocketJson(options.command, options.args ?? {});

  return await new Promise((resolve, reject) => {
    let settled = false;
    const ws = new WebSocket(url);
    let connectTimer: ReturnType<typeof setTimeout> | undefined;

    const cleanup = (): void => {
      clearTimeout(connectTimer);
      options.signal?.removeEventListener('abort', onAbort);
      try {
        ws.close();
      } catch {
        /* ignore */
      }
    };

    const fail = (msg: string): void => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error(msg));
    };

    const ok = (): void => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(new Response('ok.', { status: 200, statusText: 'OK' }));
    };

    const onAbort = (): void => {
      fail('Aborted');
    };

    options.signal?.addEventListener('abort', onAbort);

    connectTimer = setTimeout(
      () => fail('PropertyListener WebSocket connection timeout'),
      8_000,
    );

    ws.onopen = (): void => {
      clearTimeout(connectTimer);
      try {
        ws.send(payload);
      } catch (e) {
        fail(e instanceof Error ? e.message : String(e));
        return;
      }
      setTimeout(ok, 0);
    };

    ws.onerror = (): void => {
      fail('WebSocket error (is FlightGear running with --httpd / PropertyListener?)');
    };
  });
}

/**
 * Builds the same JSON body old Phi used for {@code fgcommand.timeofday(type, offset)}.
 */
export function buildTimeOfDayCommandArgs(timeofday: string, offset = 0): FgCommandArgsJson {
  return {
    name: '',
    children: [
      { name: 'timeofday', index: 0, value: timeofday },
      { name: 'offset', index: 0, value: offset },
    ],
  };
}

/**
 * Args for the built-in {@code nasal} fgcommand ({@code FGNasalSys::handleCommand} — expects {@code script},
 * optional {@code module}).
 */
export function buildNasalCommandArgs(script: string, moduleName?: string): FgCommandArgsJson {
  const children: FgCommandArgChild[] = [{ name: 'script', index: 0, value: script }];
  const mod = moduleName?.trim();
  if (mod) {
    children.push({ name: 'module', index: 0, value: mod });
  }
  return { children };
}
