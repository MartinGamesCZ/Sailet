import type { StepType } from "../../types/Step";
import { SailetCommandObject } from "./SailetCommand";

export class SailetStepObject {
  private readonly name: string;
  private readonly commands: SailetCommandObject[];

  constructor(name: string, commands: SailetCommandObject[]) {
    this.name = name;
    this.commands = commands;
  }

  public static parse(step: StepType): SailetStepObject {
    return new SailetStepObject(
      step.name,
      step.commands().map(SailetCommandObject.parse)
    );
  }

  public async run() {
    console.log(`  Running step: ${this.name}`);

    for (const command of this.commands) {
      await command.run();
    }
  }
}
