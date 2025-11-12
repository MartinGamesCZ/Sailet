import type { CommandType } from "./Command";

export type StepType = {
  name: string;
  commands: () => CommandType[];
};
