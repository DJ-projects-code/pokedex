import axios from "axios";

interface PokemonResponse {
  count: number;
  next: string;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export async function getPokemonList() {
  try {
    const response = await axios.get<PokemonResponse>(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );
    console.log("Dados", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Pokemon:", error);
    throw new Error("Erro ao buscar Pokemon");
  }
}
