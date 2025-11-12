import { ConfigFile } from "../classes/config/ConfigFile";
import { Runner } from "../classes/runner/Runner";
import { cwd } from "../utils/path";
import type { CommandClass } from "./_command";

export class RunCommand implements CommandClass {
  public name = "run";
  public aliases = [];
  public description = "Run a defined script in the Sailet configuration";
  public args = [
    {
      name: "script-name",
      aliases: [],
      description: "The name of the script to run",
      required: true,
    },
  ];

  public async run(args: string[]): Promise<void> {
    const scriptName = args[0]!;
    const directory = cwd();

    console.log(`Running script "${scriptName}" in directory "${directory}"`);

    if (!ConfigFile.exists(directory)) {
      console.error(
        "No sailet.config.ts file found in the specified directory."
      );
      return;
    }

    await Runner.run(directory, scriptName);
  }
}
