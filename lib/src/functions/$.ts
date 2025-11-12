import type { CommandType } from "../types/Command";

export function $(
  texts: TemplateStringsArray,
  ...args: any[]
): (string | CommandType)[] {
  const result: (string | CommandType)[] = [];

  texts.forEach((text, i) => {
    result.push(text);

    if (i < args.length) {
      const arg = args[i];

      if (typeof arg === "string") result.push(arg);
      else if ("command" in arg) result.push(arg as CommandType);
      else throw new Error("Invalid argument type in $ function");
    }
  });

  return result;
}
