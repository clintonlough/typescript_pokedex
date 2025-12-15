// repl.js actually refers to repl.ts
import { initState } from "./state.js";
import { startREPL } from "./repl.js";
import { State } from "./state.js";
import { PokeAPI } from "./pokeapi.js";

function main() {
  const state = initState();
  startREPL(state);


}

main();



