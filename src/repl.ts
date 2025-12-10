//Imports
import { State } from "./state";

//Type Definitions


//Functions

export function cleanInput(input: string): string[] {
    // Trim first so pure-whitespace inputs return an empty array
    const trimmed = input.trim().toLowerCase();
    if (trimmed.length === 0) {
        return [];
    }
    return trimmed.split(/\s+/);
}

export function startREPL(state: State): void {

    let words: string[] = [];
    state.readline.prompt();
    state.readline.on('line', (input) => {
        if (input === "") {
            state.readline.prompt();
        } else {
            words = cleanInput(input);
            const command = words[0]
            const cmd = state.commands[command];
            if (!cmd) {
                console.log("Unknown Command");
                state.readline.prompt();
            } else {
                try {
                    cmd.callback(state);
                } catch (e) {
                    console.log(e);
                }
                state.readline.prompt();
            }
        }
    }); 
    
};