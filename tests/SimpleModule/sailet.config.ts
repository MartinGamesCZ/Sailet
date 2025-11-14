import { cmd, module, remoteScript, script, step } from "sailet";

module("SimpleModule", () => ["./Aaa", "./Bbb"]);

script("startAll", () => [
  step("Run all", () => [
    remoteScript("aaa", "startAaa"),
    remoteScript("bbb", "startBbb"),
  ]),
]);
