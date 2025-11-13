import { SailetModule } from "../classes/modules/SailetModule";
import { SailetContext } from "../classes/SailetContext";

export function module(name: string, submodules?: () => string[]) {
  SailetContext.setModule(SailetModule.parse(name, submodules));
}
