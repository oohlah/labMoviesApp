import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    mustWatch: number[];
    addToMustWatch: ((movie: BaseMovieProps) => void);
  
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    mustWatch: [],
    addToMustWatch: () => {},
}
   

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    //lazy initialisatoin to fetch favourites from storage
   const [favourites, setFavourites] = useState<number[]>(() => {
  const saved = localStorage.getItem("favourites");
  return saved ? JSON.parse(saved) : [];
});

const [mustWatch, setMustWatch] = useState<number[]>(() => {
  const saved = localStorage.getItem("mustWatch");
  return saved ? JSON.parse(saved) : [];
});

//update local storage when state changes
useEffect(() => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}, [favourites]);


useEffect(() => {
  localStorage.setItem("mustWatch", JSON.stringify(mustWatch));
}, [mustWatch]);

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

        const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);




  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prevMustWatch) => {
            if (!prevMustWatch.includes(movie.id)) {
                console.log(`Added "${movie.title}" to Must Watch`);
                const updateMustWatch=[...prevMustWatch, movie.id]; //use unique id
                console.log("Must Watch: ", updateMustWatch);
                return updateMustWatch;
            }
           
            return prevMustWatch;
        });
    }, []);



    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                mustWatch,
                addToMustWatch,
             
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;

