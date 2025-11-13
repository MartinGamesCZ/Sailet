import path from "path";
import { SailetContext } from "../SailetContext";
import { cwd } from "../../../cli/utils/path";
import { ConfigFile } from "../../../cli/classes/config/ConfigFile";
import { SailetSubmodule } from "./SailetSubmodule";

export class SailetModule {
  private name: string;
  private submodules: string[];
  private path: string | null = null;

  private submodulePaths: { [key: string]: string } = {};

  constructor(name: string, submodules: string[]) {
    this.name = name;
    this.submodules = submodules;
  }

  public async loadSubmodules(): Promise<void> {
    SailetContext.setLoadingSubmodules(true);

    for (const submodulePath of this.submodules) {
      const fullpath = path.resolve(this.path || cwd(), submodulePath);

      if (!ConfigFile.exists(fullpath)) {
        console.error(`Submodule config not found at path: ${fullpath}`);
        continue;
      }

      await import(ConfigFile.getPath(fullpath));
      if (!SailetContext.getActiveSubmoduleId()) continue;

      this.submodulePaths[SailetContext.getActiveSubmoduleId()!] = fullpath;
      SailetContext.setActiveSubmoduleId(null);
    }

    SailetContext.setLoadingSubmodules(false);
  }

  public setPath(path: string) {
    this.path = path;
  }

  public getName(): string {
    return this.name;
  }

  public getSubmodulePath(submodule: string): string {
    return this.submodulePaths[submodule]!;
  }

  public static parse(
    name: string,
    submodules?: () => string[],
    path?: string
  ): SailetModule {
    return new SailetModule(name, submodules ? submodules() : []);
  }
}
