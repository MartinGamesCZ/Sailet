// sailet.config.ts

import { script, step, cmd } from "sailet";

script("start", () => [
  step("Run project using Bun", () => [cmd("bun run index.ts")]),
]);
