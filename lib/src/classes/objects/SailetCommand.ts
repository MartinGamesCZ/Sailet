import { exec, spawn } from "child_process";
import type { CommandType } from "../../types/Command";
import { SailetLogger, SailetLoggerTemplate } from "../SailetLogger";
import chalk from "chalk";
import { cwd } from "../../../cli/utils/path";

export class SailetCommandObject {
  public readonly command: (string | SailetCommandObject)[];

  private logger: SailetLogger;

  constructor(command: (string | SailetCommandObject)[]) {
    this.command = command;

    this.logger = new SailetLogger(SailetLoggerTemplate.Command, 4);
  }

  public static parse(command: CommandType): SailetCommandObject {
    return new SailetCommandObject(
      Array.isArray(command.command)
        ? command.command.map((cmd) =>
            typeof cmd === "string" ? cmd : SailetCommandObject.parse(cmd)
          )
        : [command.command]
    );
  }

  public async run(
    suppressOutput: boolean = false,
    level: number = 0
  ): Promise<string> {
    this.logger = new SailetLogger(
      level == 0
        ? SailetLoggerTemplate.Command
        : SailetLoggerTemplate.Subcommand,
      4 + level
    );

    this.logger.log(
      this.command
        .map((part) =>
          typeof part === "string" ? part : chalk.magenta("sub-command")
        )
        .join("")
    );

    const results: string[] = [];

    for (const part of this.command) {
      if (typeof part === "string") results.push(part);
      else results.push(await part.run(true, level + 2));
    }

    const proc = spawn(results.join(""), {
      shell: true,
      stdio: ["inherit", "pipe", "inherit"],
      cwd: cwd(),
    });

    return new Promise<string>((resolve) => {
      let output = "";

      proc.stdout?.on("data", (data) => {
        output += data.toString();
        if (!suppressOutput) process.stdout.write(data);
      });

      proc.on("close", () => resolve(output.trim()));
      proc.on("error", () => resolve(output.trim()));
    });
  }
}
