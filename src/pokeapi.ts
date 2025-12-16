import { Cache } from "./pokecache.js";

export class PokeAPI {
  #cache: Cache;
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {
    //set interval length by modifying the final digit.
    this.#cache = new Cache(1000 * 60 * 10);
  }

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const locationsURL = pageURL || PokeAPI.baseURL + "/location-area/"

    // Synchronous cache check
    const cached = this.#cache.get<ShallowLocations>(locationsURL);
    if (cached !== undefined) {
      return cached; // Return immediately if found
    }

    const response = await fetch(locationsURL, {
      method: "GET",
      mode: "cors",
    });

    const data = await response.json();
    this.#cache.add<ShallowLocations>(locationsURL, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    return "";
  }
}

export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: {
    name: string,
    url: string;
  }[];
};

export type Location = {
//todo - single location implementation
};
