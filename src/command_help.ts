import { State } from "./state";

export async function commandHelp(state: State, ...args: string[]): Promise<void> {
    console.log("Welcome to the Pokedex!");
    console.log("usage:");
    console.log("");
    const availableCommands = state.commands;
    for (const command in availableCommands) {
        console.log(`${availableCommands[command].name}: ${availableCommands[command].description}`);
    }
    return Promise.resolve()
}