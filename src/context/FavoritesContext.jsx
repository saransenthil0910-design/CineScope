import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("cinescopeFavorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => {
      const alreadyExists = prevFavorites.some(
        (item) => item.imdbID === movie.imdbID
      );

      if (alreadyExists) {
        return prevFavorites;
      }

      const updatedFavorites = [...prevFavorites, movie];

      localStorage.setItem(
        "cinescopeFavorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (movie) => movie.imdbID !== id
      );

      localStorage.setItem(
        "cinescopeFavorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  };

  const isFavorite = (id) => {
    return favorites.some((movie) => movie.imdbID === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}