import { useEffect, useState } from "react";
import { getMovies } from '../api/tmdb-api'
import { MovieDetailsProps } from '../types/interfaces';

const useMovie = (id: string) => {
    const [movie, setMovie] = useState<MovieDetailsProps>();
    useEffect(() => {
        getMovies(id).then(movie => {
            setMovie(movie);
        });
    }, [id]);
    return [movie, setMovie] as const;
};

export default useMovie;