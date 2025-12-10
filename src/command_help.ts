import { State } from "./state";

export function commandHelp(state: State): void {
    console.log("Welcome to the Pokedex!");
    console.log("usage:");
    console.log("");
    const availableCommands = state.commands;
    for (const command in availableCommands) {
        console.log(`${availableCommands[command].name}: ${availableCommands[command].description}`);
    }
}