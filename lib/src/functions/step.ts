import type { RemoteScriptType } from "src/types/RemoteScript";
import type { CommandType } from "../types/Command";
import type { StepType } from "../types/Step";

export function step(
  name: string,
  cmds: () => (CommandType | RemoteScriptType)[]
): StepType {
  return {
    name,
    actions: cmds,
  };
}
