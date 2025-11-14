import { module, remoteScript, script, step } from "sailet";

module("MyModule", () => ["./Project1", "./Project2"]);

script("start", () => [
  step("Run Project2 script", () => [remoteScript("Project2", "start")]),
]);
