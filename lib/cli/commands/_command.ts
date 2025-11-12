export interface CommandArg {
  name: string;
  aliases: string[];
  description: string;
  required: boolean;
}

export interface CommandClass {
  name: string;
  aliases: string[];
  description: string;
  args: CommandArg[];
  run(args: string[]): Promise<void>;
}
