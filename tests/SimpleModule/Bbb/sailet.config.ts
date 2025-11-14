import { cmd, script, step } from "sailet";
import { submodule } from "sailet";

submodule("bbb");

script("startBbb", () => [
  step("Run bbb", () => [cmd("echo 'This is Bbb module'")]),
]);
