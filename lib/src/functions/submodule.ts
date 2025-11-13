import { SailetContext } from "../classes/SailetContext";

export function submodule(name: string) {
  SailetContext.setSubmoduleId(name);
}
