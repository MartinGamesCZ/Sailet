import type { StepType } from "./Step";

export type ScriptType = {
  name: string;
  steps: () => StepType[];
};
