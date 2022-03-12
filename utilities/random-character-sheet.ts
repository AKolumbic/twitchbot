import _ from "lodash";
import { characterSheets } from "../secrets";

export function randomCharacterSheet(): string {
  return _.sample(characterSheets) as string;
}
