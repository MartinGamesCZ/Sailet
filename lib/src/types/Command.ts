export type CommandType = {
  command: string | (string | CommandType)[];
};

export type CommandReturnType = any;
