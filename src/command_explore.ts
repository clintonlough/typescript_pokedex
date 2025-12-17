import { State } from "./state";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {

    const api = state.pokeAPI;
    const locationName = args[0];
    const location = await api.fetchLocation(locationName);

    console.log(`Exploring ${locationName}...`);
    console.log("Found Pokemon:");

    for (const encounter of location.pokemon_encounters) {
    console.log(`- ${encounter.pokemon.name}`);
    }
};