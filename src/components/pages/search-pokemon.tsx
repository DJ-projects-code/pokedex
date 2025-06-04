import { getPokemonList } from "@/api/get-pokemon-list";
import { getPokemonDetails } from "@/api/get-pokemon-details";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Table } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


interface PokemonListItem {
  name: string;
  sprites: {
    front_default: string;
  };
}


const searchPokemonSchema = z.object({
  nameOrId: z.string().min(1, "Nome ou ID do Pokémon é obrigatório"),
});


type SearchPokemonType = z.infer<typeof searchPokemonSchema>;

export function SearchPokemon() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonListItem | null>(null);


  const searchPokemonForm = useForm<SearchPokemonType>({
    resolver: zodResolver(searchPokemonSchema),
    defaultValues: {
      nameOrId: "",
    },
  });

  const onSubmit = async (data: SearchPokemonType) => {
    try {
      const result = await getPokemonDetails(data.nameOrId.toLowerCase());
      setSearchedPokemon(result);
      setPokemonList([]); // limpa a lista de todos
    } catch (err) {
      console.error("Erro ao buscar Pokémon:", err);
      setSearchedPokemon(null);
    }
    searchPokemonForm.reset();
  };


  // Buscar os 20 primeiros
  const handleViewAllPokemon = async () => {
    try {
      const list = await getPokemonList();
      const detailedList = await Promise.all(
        list.results.map(async (pokemon) => await getPokemonDetails(pokemon.name))
      );
      setPokemonList(detailedList);
      setSearchedPokemon(null);
    } catch (err) {
      console.error("Erro ao buscar lista de Pokémon:", err);
    }
  };

  return (
    <div className="flex flex-col w-screen h-full justify-center items-center">
      <Form {...searchPokemonForm}>
        <form onSubmit={searchPokemonForm.handleSubmit(onSubmit)}>
          <FormField
            control={searchPokemonForm.control}
            name="nameOrId"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-2xl">Encontre um Pokemon</FormLabel>
                <FormMessage />
                <FormControl>
                  <div>
                    <Input
                      className="w-96"
                      placeholder="Charizard..."
                      {...field}
                    />
                    <Button
                      type="submit"
                      variant="default"
                      className="group size-7 hover:w-44 absolute -mt-8 right-1 ease-in-out duration-300 cursor-pointer"
                    >
                      <span className="hidden group-hover:flex ident-1 overflow-hidden">
                        Buscar Pokemon
                      </span>
                      <ArrowRight />
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Digite o nome ou ID do Pokemon que deseja encontrar.
                </FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="grid grid-cols-2 mt-4">
        <Button className="w-full h-16 cursor-pointer" variant="default" onClick={handleViewAllPokemon}>
          <Table />
          Pokedex
        </Button>
      </div>

      {/* Resultado da busca por nome ou ID */}
      {searchedPokemon && (
        <div className="flex flex-col items-center border p-4 rounded-xl shadow-md mb-4">
          <h3 className="text-2xl capitalize">{searchedPokemon.name}</h3>
          <img
            src={searchedPokemon.sprites.front_default}
            alt={`Imagem de ${searchedPokemon.name}`}
            className="w-[200px] h-[200px] rounded-full mt-2"
          />
        </div>
      )}

      {/* Lista dos Pokemons */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.name}
            className="flex flex-col items-center border p-4 rounded-xl shadow-md"
          >
            <h3 className="text-xl capitalize mb-2">{pokemon.name}</h3>
            <img
              src={pokemon.sprites.front_default}
              alt={`Imagem de ${pokemon.name}`}
              className="w-[150px] h-[150px] rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}