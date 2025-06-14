import { createContext, useContext, useState, type ReactNode } from "react";
import type { FavoritesContextType } from "../types";

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({children}:{children: ReactNode}) => {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    const toggleFavorite = (id: string) => {
        setFavoriteIds((prev)=> prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]);
    };

    const clearFavorites = () => setFavoriteIds([]);

    return (
        <FavoritesContext.Provider value={{favoriteIds,toggleFavorite,clearFavorites}}>
{children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};