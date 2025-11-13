import type { CommandType } from "./Command";
import type { RemoteScriptType } from "./RemoteScript";

export type StepType = {
  name: string;
  actions: () => (CommandType | RemoteScriptType)[];
};
