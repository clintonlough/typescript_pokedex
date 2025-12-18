import { State } from "./state";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const pokemonSearchName = args[0];
    if (state.pokedex[pokemonSearchName]) {
        console.log(`Name: ${state.pokedex[pokemonSearchName].name}`);
        console.log(`Height: ${state.pokedex[pokemonSearchName].height}`);
        console.log(`Weight: ${state.pokedex[pokemonSearchName].weight}`);
        console.log("Stats:");
            for (const stat of state.pokedex[pokemonSearchName].stats) {
                console.log(`- ${stat.stat.name}: ${stat.base_stat}`);
            }  
        console.log("Types:");
            for (const type of state.pokedex[pokemonSearchName].types) {
                console.log(`- ${type.type.name}`);
            }   
    } else {
        console.log("you have not caught that pokemon");
    }
}