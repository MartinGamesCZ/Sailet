import type { ScriptType } from "../types/Script";
import type { SailetModule } from "./modules/SailetModule";

export class SailetContext {
  private scripts: {
    [key: string]: ScriptType[];
  } = {};
  private module: SailetModule | null = null;
  private submoduleId: string | null = null;
  private activeSubmoduleId: string | null = null;
  private loadingSubmodules: boolean = false;

  private cwd: string = process.cwd();

  private static get instance(): SailetContext {
    if ((global as any)._libSailetContext)
      return (global as any)._libSailetContext;

    const instance = new SailetContext();
    (global as any)._libSailetContext = instance;

    return instance;
  }

  public static setActiveSubmoduleId(id: string | null) {
    this.instance.activeSubmoduleId = id;
  }

  public static getActiveSubmoduleId(): string | null {
    return this.instance.activeSubmoduleId;
  }

  public static registerScript(script: ScriptType) {
    const key =
      this.instance.activeSubmoduleId || this.instance.submoduleId || "@";

    this.instance.scripts[key] = this.instance.scripts[key] || [];
    this.instance.scripts[key].push(script);
  }

  public static getScripts(submodule?: string): ScriptType[] {
    return (
      this.instance.scripts[
        submodule ||
          this.instance.activeSubmoduleId ||
          this.instance.submoduleId ||
          "@"
      ] || []
    );
  }

  public static setModule(module: SailetModule | null) {
    this.instance.module = module;
  }

  public static getModule(): SailetModule | null {
    return this.instance.module;
  }

  public static setSubmoduleId(id: string | null) {
    if (this.instance.loadingSubmodules) {
      this.setActiveSubmoduleId(id);
      return;
    }

    this.instance.submoduleId = id;
  }

  public static getSubmoduleId(): string | null {
    return this.instance.submoduleId;
  }

  public static setLoadingSubmodules(loading: boolean) {
    this.instance.loadingSubmodules = loading;
  }

  public static setCwd(cwd: string) {
    this.instance.cwd = cwd;
  }

  public static getCwd(): string {
    return this.instance.cwd;
  }
}
