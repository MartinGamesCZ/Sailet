#! /usr/bin/env bun

import type { CommandClass } from "./commands/_command";
import { InitCommand } from "./commands/init";
import { RunCommand } from "./commands/run";

const COMMANDS: (new () => CommandClass)[] = [InitCommand, RunCommand];

async function main() {
  const args = process.argv.slice(2);

  const commandName = args[0]!;

  for (const Command of COMMANDS) {
    const commandInstance = new Command();

    if (
      commandInstance.name === commandName ||
      commandInstance.aliases.includes(commandName)
    ) {
      if (!validateArguments(commandInstance, args.slice(1))) return;

      await commandInstance.run(args.slice(1));

      return;
    }
  }

  console.error(`Unknown command: ${commandName}`);
}

function validateArguments(
  commandInstance: CommandClass,
  args: string[]
): boolean {
  const requiredArgs = commandInstance.args.filter((arg) => arg.required);

  if (args.length < requiredArgs.length) {
    console.error(
      `Missing required arguments for command "${commandInstance.name}".`
    );
    printUsage(commandInstance);

    return false;
  }

  return true;
}

function printUsage(commandInstance: CommandClass): void {
  console.log(`Usage: ${commandInstance.name} [options]`);

  if (commandInstance.args.length > 0) {
    console.log("Arguments:");

    for (const arg of commandInstance.args) {
      console.log(
        `  ${arg.name} - ${arg.description} ${
          arg.required ? "(required)" : "(optional)"
        }`
      );
    }
  }
}

await main();
