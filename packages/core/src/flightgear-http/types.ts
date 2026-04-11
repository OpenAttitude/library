/**
 * JSON shape merged into an {@link SGPropertyNode} via FlightGear’s {@code JSON::toProp}
 * ({@code flightgear/src/Network/http/jsonprops.cxx}).
 * Mirrors the object trees produced by old Phi’s {@code fgcommand.js} ({@code oneArg} / {@code twoArgs}).
 */
export type FgCommandArgChild = {
  name: string;
  index?: number;
  value?: string | number | boolean;
  children?: FgCommandArgChild[];
};

/**
 * Root argument object for fgcommands: {@code POST /run.cgi?value=<command>} or PropertyListener
 * {@code { command: "exec", fgcommand, ... }} (see {@link buildFgExecWebSocketJson}).
 * Often {@code { name: '', children: [...] }} for multi-argument commands.
 */
export type FgCommandArgsJson = {
  name?: string;
  index?: number;
  value?: string | number | boolean;
  children?: FgCommandArgChild[];
};
