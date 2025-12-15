export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const locationsURL = pageURL || PokeAPI.baseURL + "/location-area/"
    const response = await fetch(locationsURL, {
      method: "GET",
      mode: "cors",
    });
    return response.json();
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
