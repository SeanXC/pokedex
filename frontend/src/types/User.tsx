import { Pokemon } from "./Pokemon";

export interface User {
  username: string;
  password: string;
  confirmPassword: string;
  pokemonCount: number;
  favorites: Pokemon[];
}
