import { State } from "./state.js";
import { Pokemon } from "./pokeapi.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {

    //Get pokemon info from the API
    const pokemonName = args[0];
    let pokemon: Pokemon | null = null;
    try {
        const api = state.pokeAPI;
        pokemon = await api.fetchPokemon(pokemonName);
        console.log(`Throwing a Pokeball at ${pokemonName}...`);
    } catch(e) {
        console.log("unable to fetch pokemon information");
    }

    //Attempt to catch
    if (pokemon) {
        const catchChance = Math.round(pokemon.base_experience / 35);
        const rolledNum = Math.floor(Math.random() * (catchChance + 1));
        if (catchChance === rolledNum) {
            console.log(`${pokemon.name} was caught!`);
            state.pokedex[pokemon.name] = pokemon;
        } else {
            console.log(`${pokemon.name} escaped!`);
        }
    }

};