import { CLICommand, getCommands } from "./repl.js";

export function commandHelp(): void {
    console.log("Welcome to the Pokedex!");
    console.log("usage:");
    console.log("");
    const availableCommands = getCommands();
    for (const command in availableCommands) {
        console.log(`${availableCommands[command].name}: ${availableCommands[command].description}`);
    }
}