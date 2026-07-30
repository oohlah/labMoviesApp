import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review, FantasyMovie } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);
    mustWatch: number[];
    addToMustWatch: ((movie: BaseMovieProps) => void);
    fantasyMovies: FantasyMovie[]; 
    addFantasyMovie: ((fantasyMovie: FantasyMovie) => void);
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (movie, review) => { movie.id, review}, 
    mustWatch: [],
    addToMustWatch: () => {},
    fantasyMovies: [],
    addFantasyMovie: (fantasyMovie) => { fantasyMovie}, 
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>( [] );
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);
    const [myFantasyMovies, setMyFantasyMovies] = useState<FantasyMovie[]>( [] );

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


    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };

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

     const addFantasyMovie  = (fantasyMovie: FantasyMovie) => {
    setMyFantasyMovies((myFantasyMovies) => [
        ...myFantasyMovies,
        fantasyMovie]);
   };

 

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                mustWatch,
                addToMustWatch,
                fantasyMovies: myFantasyMovies,
                addFantasyMovie
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;

