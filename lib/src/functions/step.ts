import type { CommandType } from "../types/Command";
import type { StepType } from "../types/Step";

export function step(name: string, cmds: () => CommandType[]): StepType {
  return {
    name,
    actions: cmds,
  };
}
