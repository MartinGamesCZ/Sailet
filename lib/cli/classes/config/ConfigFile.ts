import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { writeFile } from "fs/promises";

export class ConfigFile {
  public static filename = "sailet.config.ts";

  public static getPath(directory: string): string {
    return `${directory}/${ConfigFile.filename}`;
  }

  public static async create(directory: string): Promise<void> {
    if (ConfigFile.exists(directory))
      return console.error("Config file already exists.");

    const path = ConfigFile.getPath(directory);
    const template = ConfigFile.constructTemplate();

    await writeFile(path, template);
  }

  public static exists(directory: string): boolean {
    const path = ConfigFile.getPath(directory);

    return existsSync(path);
  }

  public static async read(directory: string): Promise<string | null> {
    if (!ConfigFile.exists(directory)) return null;

    const path = ConfigFile.getPath(directory);

    return await readFile(path, "utf-8");
  }

  public static constructTemplate(): string {
    return [
      "// sailet.config.ts",
      "",
      "import { script, step, cmd } from 'sailet';",
      "",
      "script('start', () => [",
      "  step('Run project using Bun', () => [",
      "    cmd('bun run index.ts'),",
      "  ])",
      "])",
    ].join("\n");
  }
}
