export interface charsResponse {
  count: number;
  next: string;
  previous: string | null;
  results?: charsInfos[];
}

export const charsResponseModel = {
  count: 0,
  next: '',
  previous: '',
}

export interface charsInfos {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: object;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: object;
  starships: object;
  url: string;
  vehicles: object;
}

export const charsModel = {
  birth_year: '',
  created: '',
  edited: '',
  eye_color: '',
  films: [],
  gender: '',
  hair_color: '',
  height: '',
  homeworld: '',
  mass: '',
  name: '',
  skin_color: '',
  species: [],
  starships: [],
  url: '',
  vehicles: [],
}

export type ListChar = string | null

export interface favContext {
  fav: string[];
  setFav: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface searchTypes {
  name: string;
  hair: string;
  skin: string;
}