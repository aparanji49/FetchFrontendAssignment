export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

export interface DogCoordinates {
  lat: number;
  lon: number;
}

export interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
   showFavoriteIcon?: boolean; 
}
export type SortOrder = "asc" | "desc";

export interface DogSearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface Match {
  match: string;
}

export interface FavoritesContextType {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
  matchId: string | null;
  setMatchId: (id: string | null) => void;
}


export interface SearchFiltersProps {
  onApply: (filters: {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    sort?: string;
  }) => void;
  onClear: () => void;
}

export type DogSearchFilters = {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
};
