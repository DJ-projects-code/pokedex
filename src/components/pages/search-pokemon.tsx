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
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchPokemonSchema = z.object({
  nameOrId: z.string().min(1, "Nome ou ID do Pokémon é obrigatório"),
});

type SearchPokemonType = z.infer<typeof searchPokemonSchema>;

export function SearchPokemon() {
  const searchPokemonForm = useForm<SearchPokemonType>({
    resolver: zodResolver(searchPokemonSchema),
    defaultValues: {
      nameOrId: "",
    },
  });

  const onSubmit = (data: SearchPokemonType) => {
    console.log("Searching for Pokémon:", data);
    searchPokemonForm.reset();
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
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
        <Button className="w-full h-16 cursor-pointer" variant="default">
          <Table />
          Pokedex
        </Button>
      </div>
    </div>
  );
}
