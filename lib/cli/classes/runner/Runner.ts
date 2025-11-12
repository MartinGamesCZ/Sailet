import { SailetContext } from "../../../src/classes/SailetContext";
import { SailetRunner } from "../../../src/classes/SailetRunner";
import { ConfigFile } from "../config/ConfigFile";

export class Runner {
  public static async run(directory: string, scriptName: string) {
    const configContent = await ConfigFile.read(directory);

    await import(ConfigFile.getPath(directory));
    await SailetRunner.runScript(scriptName);
  }
}
