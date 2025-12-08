//Imports
import {createInterface} from "readline";
import {commandExit} from "./command_exit.js";
import {commandHelp} from "./command_help.js";

//Type Definitions
export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
};

//Functions

export function cleanInput(input: string): string[] {
    // Trim first so pure-whitespace inputs return an empty array
    const trimmed = input.trim().toLowerCase();
    if (trimmed.length === 0) {
        return [];
    }
    return trimmed.split(/\s+/);
}

export function startREPL(): void {
    
    const input = process.stdin;
    const output = process.stdout;
    const prompt = "Pokedex > ";
    let words: string[] = [];
    const rl = createInterface({ input, output });
    rl.setPrompt(prompt);
    rl.prompt();
    rl.on('line', (input) => {
        if (input === "") {
            rl.prompt();
        } else {
            words = cleanInput(input);
            const command = words[0]
            executeCommand(command);
            rl.prompt();
        }
    }); 
    
}

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
    },
    // can add more commands here
  };
}

export function executeCommand(command: string): void {
    const availableCommands = getCommands();
    if (command in availableCommands) {
        availableCommands[command].callback(availableCommands);
    } else {
        console.log("Unknown command");
    }
}
