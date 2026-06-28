import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlaylist from "../components/cardIcons/addToPlaylist";



const UpcomingMovies: React.FC = () => {

    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("upcoming", getUpcomingMovies);



   if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

   const movies = data ? data.results : [];

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie: BaseMovieProps) => {
          return (
            <>
              <AddToPlaylist {...movie}/>
      
            </>
          );
        }}
    />
  );
};
export default UpcomingMovies;
