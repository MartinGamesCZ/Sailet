import { SailetContext } from "../../src/classes/SailetContext";

export function cwd() {
  return SailetContext.getCwd() ?? process.cwd();
}
