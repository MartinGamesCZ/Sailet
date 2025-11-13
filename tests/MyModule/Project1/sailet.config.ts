// sailet.config.ts

import { script, step, cmd, submodule } from "sailet";

submodule("Project1");

script("start", () => [
  step("Run project 1 using Bun", () => [cmd("bun run index.ts")]),
]);
