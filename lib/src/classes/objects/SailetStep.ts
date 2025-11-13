import type { StepType } from "../../types/Step";
import { SailetLogger, SailetLoggerTemplate } from "../SailetLogger";
import { SailetCommandObject } from "./SailetCommand";

export class SailetStepObject {
  private readonly _name: string;
  private readonly commands: SailetCommandObject[];

  private logger: SailetLogger;

  constructor(name: string, commands: SailetCommandObject[]) {
    this._name = name;
    this.commands = commands;

    this.logger = new SailetLogger(SailetLoggerTemplate.Step(name), 2);
  }

  public static parse(step: StepType): SailetStepObject {
    return new SailetStepObject(
      step.name,
      step.commands().map(SailetCommandObject.parse)
    );
  }

  public get name() {
    return this._name;
  }

  public async run() {
    this.logger.log("Running commands...");

    for (const command of this.commands) {
      await command.run();
    }
  }
}
