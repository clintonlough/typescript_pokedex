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

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
   const pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

    // Synchronous cache check
    const cached = this.#cache.get<Pokemon>(pokemonURL);
    if (cached !== undefined) {
      return cached; // Return immediately if found
    }

    const response = await fetch(pokemonURL, {
      method: "GET",
      mode: "cors",
    });

    const data = await response.json();
    this.#cache.add<Pokemon>(pokemonURL, data);

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

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      official_artwork: {
        front_default: string;
        front_shiny: string;
      };
    };
    versions: {
      [generation: string]: {
        [game: string]: {
          back_default: string;
          back_female?: any;
          back_shiny: string;
          back_shiny_female?: any;
          front_default: string;
          front_female?: any;
          front_shiny: string;
          front_shiny_female?: any;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};
