import { State } from "./state";

export async function commandMap(state: State, ...args: string[]): Promise<void> {
    const api = state.pokeAPI;
    const locations = await api.fetchLocations(state.nextLocationsURL);

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for (const loc of locations.results) {
      console.log(loc.name);
    }
};

export async function commandMapb(state: State): Promise<void> {
    if (state.prevLocationsURL) {
      const api = state.pokeAPI;
      const locations = await api.fetchLocations(state.prevLocationsURL);

      state.nextLocationsURL = locations.next;
      state.prevLocationsURL = locations.previous;

      for (const loc of locations.results) {
        console.log(loc.name);
      }
    } else {
      console.log("you're on the first page");
    }

};