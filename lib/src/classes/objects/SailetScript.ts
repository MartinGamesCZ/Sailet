import chalk from "chalk";
import type { ScriptType } from "../../types/Script";
import { SailetLogger, SailetLoggerTemplate } from "../SailetLogger";
import { SailetStepObject } from "./SailetStep";

export class SailetScriptObject {
  public readonly name: string;
  public readonly steps: SailetStepObject[];

  private logger: SailetLogger;

  constructor(name: string, steps: SailetStepObject[], submodule?: string) {
    this.name = name;
    this.steps = steps;

    this.logger = new SailetLogger(
      SailetLoggerTemplate.Script(this.name, submodule)
    );
  }

  public static parse(
    script: ScriptType,
    submodule?: string
  ): SailetScriptObject {
    return new SailetScriptObject(
      script.name,
      script.steps().map(SailetStepObject.parse),
      submodule
    );
  }

  public async run() {
    for (const step of this.steps) {
      this.logger.log(
        `Running step ${chalk.yellow(step.name)}${chalk.gray("...")}`
      );

      await step.run();
    }
  }
}
