import { SailetContext } from "../classes/SailetContext";
import type { StepType } from "../types/Step";

export function script(name: string, stepsFn: () => StepType[]) {
  SailetContext.registerScript({
    name: name,
    steps: () => [],
  });
}
