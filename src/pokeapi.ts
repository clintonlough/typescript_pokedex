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
   const locationURL = "https://pokeapi.co/api/v2/location-area/" + locationName;

    // Synchronous cache check
    const cached = this.#cache.get<Location>(locationURL);
    if (cached !== undefined) {
      return cached; // Return immediately if found
    }

    const response = await fetch(locationURL, {
      method: "GET",
      mode: "cors",
    });

    const data = await response.json();
    this.#cache.add<Location>(locationURL, data);

    return data;
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
  id: number,
  name: string,
  encounter_method_rates: {
    encounter_method: {
      name: string,
      url: string;
    },
    version_details: {
      rate: number,
      version: {
        name: string,
        url: string;
      },
    };
  }[],
  location: {
    name: string,
    url: string;
  },
  names: {
    name: string,
    language: {
      name: string,
      url: string;
    };
  }[],
  pokemon_encounters: {
    pokemon: {
      name: string,
      url: string;
    },
    version_details: {
      version: {
        name: string,
        url: string;
      },
      max_chance: number,
      encounter_details: {
        min_level: number,
        max_level: number,
        condition_values: [],
        chance: number,
        method: {
          name: string,
          url: string;
        }
      }
    }[];
  }[];
};
