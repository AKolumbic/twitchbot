"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacterSheet = void 0;
const lodash_1 = __importDefault(require("lodash"));
const secrets_1 = require("../../secrets");
function getCharacterSheet() {
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    switch (day) {
        case 'Tuesday':
            return `Here's the character sheet for Rhopraxus Rhogthroknaar: https://www.dndbeyond.com/profile/drosshole/characters/63459699`;
        case 'Wednesday':
            return `Here's the character sheet for Marek d'Toussaint: https://www.dndbeyond.com/profile/drosshole/characters/55956716`;
        case 'Sunday':
            return `Today, I'm DMing! Here's a random character of mine from over on DnD Beyond: ${lodash_1.default.sample(secrets_1.characterSheets)}`;
        default:
            return `Check out a random character of mine on DnD Beyond: ${lodash_1.default.sample(secrets_1.characterSheets)}`;
    }
}
exports.getCharacterSheet = getCharacterSheet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNoYXJhY3Rlci1zaGVldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsaXRpZXMvZ2V0LWNoYXJhY3Rlci1zaGVldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBdUI7QUFDdkIsMkNBQWdEO0FBRWhELFNBQWdCLGlCQUFpQjtJQUMvQixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQ2pDLE9BQU8sRUFDUCxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FDcEIsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRXJCLFFBQVEsR0FBRyxFQUFFO1FBQ1gsS0FBSyxTQUFTO1lBQ1osT0FBTyx5SEFBeUgsQ0FBQztRQUNuSSxLQUFLLFdBQVc7WUFDZCxPQUFPLG1IQUFtSCxDQUFDO1FBQzdILEtBQUssUUFBUTtZQUNYLE9BQU8sZ0ZBQWdGLGdCQUFDLENBQUMsTUFBTSxDQUFDLHlCQUFlLENBQUMsRUFBRSxDQUFDO1FBQ3JIO1lBQ0UsT0FBTyx1REFBdUQsZ0JBQUMsQ0FBQyxNQUFNLENBQUMseUJBQWUsQ0FBQyxFQUFFLENBQUM7S0FDN0Y7QUFDSCxDQUFDO0FBaEJELDhDQWdCQyJ9