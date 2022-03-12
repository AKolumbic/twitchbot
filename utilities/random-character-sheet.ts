import { sample } from "lodash";
import { characterSheets } from "../secrets";

export function randomCharacterSheet(): string {
  return sample(characterSheets) as string;
}
