//Imports
import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

//Type Definitions

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
}

//Functions

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

export function initState(): State {
    const input = process.stdin;
    const output = process.stdout;
    const prompt = "Pokedex > ";
    const rl = createInterface({ input, output });
    rl.setPrompt(prompt);

    const state: State = {
        readline: rl,
        commands: getCommands(),
    };
    return state;
}

