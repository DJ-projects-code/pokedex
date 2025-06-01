import axios from "axios";

// Tipos
interface PokemonListItem {
  name: string;
  sprites: {
    front_default: string;
  };
}

export async function getPokemonDetails(
  nameOrId: string
): Promise<PokemonListItem> {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  return {
    name: res.data.name,
    sprites: {
      front_default: res.data.sprites.front_default,
    },
  };
}
