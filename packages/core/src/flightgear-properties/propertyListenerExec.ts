import type { FgCommandArgsJson } from '../flightgear-http/types';

/**
 * Builds a PropertyListener WebSocket message that runs an fgcommand via {@code command: "exec"}
 * ({@code flightgear/src/Network/http/PropertyChangeWebsocket.cxx} {@code handleExecCommand}).
 */
export function buildFgExecWebSocketJson(fgcommand: string, args: FgCommandArgsJson): string {
  const o: Record<string, unknown> = {
    command: 'exec',
    fgcommand,
  };
  if (args.name !== undefined) {
    o.name = args.name;
  }
  if (args.children !== undefined) {
    o.children = args.children;
  }
  if (args.value !== undefined) {
    o.value = args.value;
  }
  return JSON.stringify(o);
}

/**
 * Sends an {@code exec} message on an existing PropertyListener WebSocket (e.g. Pinia
 * `useFlightGearPanelPropertiesStore().sendPropertyListenerRaw`).
 * Prefer this over opening a separate socket when the UI is already connected.
 */
export function sendFgExecCommand(
  sendRaw: (text: string) => void,
  fgcommand: string,
  args: FgCommandArgsJson = {},
): void {
  sendRaw(buildFgExecWebSocketJson(fgcommand, args));
}
