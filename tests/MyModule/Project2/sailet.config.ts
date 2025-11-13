// sailet.config.ts

import { script, step, cmd, submodule, remoteScript } from "sailet";

submodule("Project2");

script("start", () => [
  step("Run project 2 using Bun", () => [
    cmd("bun run index.ts hello"),
    remoteScript("Project1", "start"),
  ]),
]);
