import type { ScriptType } from "../../types/Script";
import { SailetStepObject } from "./SailetStep";

export class SailetScriptObject {
  public readonly name: string;
  public readonly steps: SailetStepObject[];

  constructor(name: string, steps: SailetStepObject[]) {
    this.name = name;
    this.steps = steps;
  }

  public static parse(script: ScriptType): SailetScriptObject {
    return new SailetScriptObject(
      script.name,
      script.steps().map(SailetStepObject.parse)
    );
  }

  public async run() {
    console.log(`Running script: ${this.name}`);

    for (const step of this.steps) {
      await step.run();
    }
  }
}
