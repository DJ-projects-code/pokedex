import { SearchPokemon } from "./components/pages/search-pokemon";
import { ThemeProvider } from "./components/theme/theme-provider";

export function App() {
  return (
    <ThemeProvider storageKey="Pokedex-theme" defaultTheme="dark">
      {/* <ActivePageProvider> */}
      <SearchPokemon />
      {/* </ActivePageProvider> */}
    </ThemeProvider>
  );
}
