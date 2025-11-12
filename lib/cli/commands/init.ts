import { ConfigFile } from "../classes/config/ConfigFile";
import { cwd } from "../utils/path";
import type { CommandClass } from "./_command";

export class InitCommand implements CommandClass {
  public name = "init";
  public aliases = [];
  public description = "Initialize a new config file in the current directory.";
  public args = [];

  public async run(args: string[]): Promise<void> {
    const dir = cwd();

    console.log(`Initializing config file in directory: ${dir}`);

    await ConfigFile.create(dir);
  }
}
