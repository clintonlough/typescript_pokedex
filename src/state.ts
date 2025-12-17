//Imports
import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { PokeAPI } from "./pokeapi.js";

//Type Definitions

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
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
    map: {
      name: "map",
      description: "Show locations from the Pokemon Universe",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Show previous 20 locations from the Pokemon Universe",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Shows the pokemon in a listed region",
      callback: commandExplore,
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
        pokeAPI: new PokeAPI,
        nextLocationsURL: null,
        prevLocationsURL: null,
    };
    return state;
}
