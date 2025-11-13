import type { StepType } from "../../types/Step";
import { SailetLogger, SailetLoggerTemplate } from "../SailetLogger";
import { SailetCommandObject } from "./SailetCommand";
import { SailetRemoteScriptObject } from "./SailetRemoteScript";

export class SailetStepObject {
  private readonly _name: string;
  private readonly actions: (SailetCommandObject | SailetRemoteScriptObject)[];

  private logger: SailetLogger;

  constructor(
    name: string,
    actions: (SailetCommandObject | SailetRemoteScriptObject)[]
  ) {
    this._name = name;
    this.actions = actions;

    this.logger = new SailetLogger(SailetLoggerTemplate.Step(name), 2);
  }

  public static parse(step: StepType): SailetStepObject {
    return new SailetStepObject(
      step.name,
      step
        .actions()
        .map((a) =>
          "remoteScript" in a
            ? SailetRemoteScriptObject.parse(a)
            : SailetCommandObject.parse(a)
        )
    );
  }

  public get name() {
    return this._name;
  }

  public async run() {
    this.logger.log("Running actions...");

    for (const action of this.actions) {
      await action.run();
    }
  }
}
