import type { ScriptType } from "../types/Script";

export class SailetContext {
  private scripts: ScriptType[] = [];

  private static get instance(): SailetContext {
    if ((global as any)._libSailetContext)
      return (global as any)._libSailetContext;

    const instance = new SailetContext();
    (global as any)._libSailetContext = instance;

    return instance;
  }

  public static registerScript(script: ScriptType) {
    this.instance.scripts.push(script);
  }

  public static getScripts(): ScriptType[] {
    return this.instance.scripts;
  }
}
