import { type Dog, type DogSearchResponse, type Match } from "../types";
import api from "./axiosInstance";

// get all breeds
export const getBreeds = () => {
  return api.get<string[]>("/dogs/breeds");
};

// get dog search results using query parameters (breeds, zipcodes, ageMin and ageMax; size, from, sort[field: breed/name/age: asc/desc])
export const getSearchResults = (params: {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}) => {
  return api.get<DogSearchResponse>("/dogs/search", { params });
};

// get dog result IDs
export const getDogsbyIDs = (ids: string[]) => {
  return api.post<Dog[]>("/dogs", ids);
};

// get match from given dog Ids

export const getMatch = (ids: string[]) => {
  return api.post<Match>("/dogs/match", ids);
};

export const getLocations = (zipCodes: string[]) => {
  return api.post<Location[]>("/locations", zipCodes);
};

export const searchLocations = (filters: {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
  size?: number;
  from?: number;
}) => {
  return api.post<{ results: Location[]; total: number }>(
    "/locations/search",
    filters
  );
};
