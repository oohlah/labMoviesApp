import React, { useState, useCallback } from "react";
import { BaseMovieProps, FantasyMovie } from "../types/interfaces";

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

    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);


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

