import { exec, spawn } from "child_process";
import type { CommandType } from "../../types/Command";

export class SailetCommandObject {
  public readonly command: (string | SailetCommandObject)[];

  constructor(command: (string | SailetCommandObject)[]) {
    this.command = command;
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
    console.log(
      `    ${" ".repeat(level)}Executing command: ${this.command
        .map((part, i) => (typeof part === "string" ? part : "[Sub-command]"))
        .join("")}`
    );

    const results: string[] = [];

    for (const part of this.command) {
      if (typeof part === "string") results.push(part);
      else results.push(await part.run(true, level + 2));
    }

    const proc = spawn(results.join(""), {
      shell: true,
      stdio: ["inherit", "pipe", "inherit"],
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
