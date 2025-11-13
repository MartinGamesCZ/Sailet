import path from "path";
import { cwd } from "../../../cli/utils/path";
import type { SailetModule } from "./SailetModule";
import { ConfigFile } from "../../../cli/classes/config/ConfigFile";
import { SailetContext } from "../SailetContext";
import { SailetLogger, SailetLoggerTemplate } from "../SailetLogger";

export class SailetSubmodule {
  private id: string;
  private module: SailetModule | null = null;

  constructor(id: string) {
    this.id = id;
  }

  public static parse(id: string) {
    return new SailetSubmodule(id);
  }

  public async findModule(submoduleId: string): Promise<void> {
    let currentPath = cwd();

    while (path.resolve(currentPath) !== path.resolve("/")) {
      const res = await this.tryFindModuleInDir(currentPath, submoduleId);

      if (res) {
        this.module = res;
        await this.module.loadSubmodules();

        return;
      }

      currentPath = path.dirname(currentPath);
    }
  }

  public async tryFindModuleInDir(
    dir: string,
    submoduleId: string
  ): Promise<SailetModule | null> {
    if (!ConfigFile.exists(dir)) return null;

    await import(path.join(dir, "sailet.config.ts"));

    const module = SailetContext.getModule();
    if (!module) return null;

    module.setPath(dir);

    return module;
  }
}
