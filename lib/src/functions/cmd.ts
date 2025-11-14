import type { CommandType } from "../types/Command";

export function cmd(command: string | (string | CommandType)[]): CommandType {
  return {
    command,
  };
}
