import { SailetScriptObject } from "./objects/SailetScript";
import { SailetContext } from "./SailetContext";

export class SailetRunner {
  public static async runScript(scriptName: string) {
    const script = this.getScriptByName(scriptName);
    if (!script) {
      console.error(`Script with name "${scriptName}" not found.`);
      return;
    }

    await script.run();
  }

  public static getScriptByName(name: string): SailetScriptObject | null {
    for (const script of SailetContext.getScripts()) {
      if (script.name !== name) continue;

      return SailetScriptObject.parse(script);
    }

    return null;
  }
}
