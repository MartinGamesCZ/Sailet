import { exec, spawn } from "child_process";
import type { CommandType } from "../../types/Command";

export class SailetCommandObject {
  public readonly command: string;

  constructor(command: string) {
    this.command = command;
  }

  public static parse(command: CommandType): SailetCommandObject {
    return new SailetCommandObject(command.command);
  }

  public async run() {
    console.log(`    Executing command: ${this.command}`);

    const proc = spawn(this.command, {
      shell: true,
      stdio: "inherit",
    });

    return new Promise<void>((resolve) => {
      proc.on("close", resolve);
      proc.on("error", resolve);
    });
  }
}
