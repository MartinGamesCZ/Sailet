import chalk from "chalk";

export class SailetLogger {
  private offset: number;
  private template: string;

  constructor(template: string, offset: number = 0) {
    this.offset = offset;
    this.template = template;
  }

  public log(message: string) {
    console.log(
      `${" ".repeat(this.offset)}${this.template.replaceAll("%s", message)}`
    );
  }

  public nl() {
    console.log();
  }
}

export class SailetLoggerTemplate {
  private static SailetPrefix = `${chalk.bold(
    chalk.green("Sailet")
  )} ${chalk.gray("//")}`;

  static Generic = `${this.SailetPrefix} ${chalk.gray("%s")}`;
  static Script = (name: string) =>
    `${this.SailetPrefix} ${chalk.gray("SCRIPT")} ${chalk.blue(
      name
    )}${chalk.gray(" | %s")}`;
  static Step = (name: string) =>
    `${chalk.gray("-")} ${chalk.gray("STEP")} ${chalk.yellow(name)}${chalk.gray(
      ": %s"
    )}`;
  static Command = `${chalk.magenta("$")} ${chalk.gray("%s")}`;
  static Subcommand = `${chalk.magenta("-")} ${chalk.gray("%s")}`;
}
