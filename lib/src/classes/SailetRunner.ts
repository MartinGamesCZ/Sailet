import chalk from "chalk";
import { SailetScriptObject } from "./objects/SailetScript";
import { SailetContext } from "./SailetContext";
import { SailetLogger, SailetLoggerTemplate } from "./SailetLogger";
import { SailetSubmodule } from "./modules/SailetSubmodule";

export class SailetRunner {
  public static async runScript(scriptName: string) {
    const script = this.getScriptByName(scriptName);
    if (!script) {
      console.error(`Script with name "${scriptName}" not found.`);
      return;
    }

    const logger = new SailetLogger(SailetLoggerTemplate.Generic);

    let submodule: SailetSubmodule | null = null;

    if (SailetContext.getSubmoduleId()) {
      submodule = SailetSubmodule.parse(SailetContext.getSubmoduleId()!);
      if (submodule)
        await submodule.findModule(SailetContext.getSubmoduleId()!);
    }

    if (submodule || SailetContext.getModule())
      logger.log(
        `Using module ${chalk.blue(
          SailetContext.getModule()?.getName()
        )}${chalk.gray("...")}`
      );
    logger.log(`Running script ${chalk.blue(scriptName)}${chalk.gray("...")}`);

    if (!submodule && SailetContext.getModule())
      await SailetContext.getModule()!.loadSubmodules();

    await script.run();
  }

  public static getScriptByName(name: string): SailetScriptObject | null {
    for (const script of SailetContext.getScripts()) {
      if (script.name !== name) continue;

      return SailetScriptObject.parse(
        script,
        SailetContext.getSubmoduleId() || undefined
      );
    }

    return null;
  }
}
