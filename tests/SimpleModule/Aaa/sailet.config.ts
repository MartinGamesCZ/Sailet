import { cmd, script, step } from "sailet";
import { submodule } from "sailet";

submodule("aaa");

script("startAaa", () => [
  step("Run aaa", () => [cmd("echo 'This is Aaa module'")]),
]);
