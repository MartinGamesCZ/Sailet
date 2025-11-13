import { exec, spawn } from "child_process";
import type { CommandType } from "../../types/Command";
import { SailetLogger, SailetLoggerTemplate } from "../SailetLogger";
import chalk from "chalk";
import type { RemoteScriptType } from "../../types/RemoteScript";
import { SailetContext } from "../SailetContext";
import { SailetScriptObject } from "./SailetScript";

export class SailetRemoteScriptObject {
  private readonly submodule: string;
  private readonly script: string;

  private logger: SailetLogger;

  constructor(submodule: string, script: string) {
    this.submodule = submodule;
    this.script = script;

    this.logger = new SailetLogger(
      SailetLoggerTemplate.RemoteScript(submodule, script),
      4
    );
  }

  public static parse(cfg: RemoteScriptType): SailetRemoteScriptObject {
    return new SailetRemoteScriptObject(
      cfg.remoteScript.submodule,
      cfg.remoteScript.script
    );
  }

  public async run(): Promise<string> {
    const script = this.getScript();
    if (!script) {
      console.error(
        `Remote script with name "${this.script}" not found in submodule "${this.submodule}".`
      );
      return "";
    }

    this.logger.log("Running remote script...");

    SailetContext.setCwd(
      SailetContext.getModule()!.getSubmodulePath(this.submodule)
    );
    await script.run();

    return "";
  }

  private getScript(): SailetScriptObject | null {
    for (const script of SailetContext.getScripts(this.submodule)) {
      if (script.name !== this.script) continue;

      return SailetScriptObject.parse(script, this.submodule);
    }

    return null;
  }
}
