import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { useQuery } from "react-query";
import { getMovie, getMovieCredits} from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { MovieDetailsProps, MovieCredits } from "../types/interfaces";
import PersonCard from "../components/personCard";

const MovieDetailsPage: React.FC= () => {
    const { id } = useParams();
  const { data: movie, error: movieErrorMessage, isLoading: movieLoading, isError: movieError} = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    ()=> getMovie(id||"")
  );

  const {data: credits, isLoading: creditsLoading, isError: creditsError, error: creditsErrorMessage,
} = useQuery<MovieCredits, Error>(
  ["credits", id],
  () => getMovieCredits(id || "")
);

console.log("Credits data:", credits);

  if (movieLoading || creditsLoading) {
    return <Spinner />;
  }

  if (movieError) {
    return <h1>{(movieErrorMessage as Error).message}</h1>;
  }

    if (creditsError) {
    return <h1>{(creditsErrorMessage as Error).message}</h1>;
  }
  return (
    <>
      {movie && credits ? ( //ternarary operator - only display page if it's ready to render
        <>
        
        <PageTemplate movie={movie}>
          

         <MovieDetails {...movie} />

          <h2>Cast</h2>
          <PersonCard credits={credits}/>
        
         </PageTemplate>
        
      </>
    ) : (
      <p>Waiting for data</p>
    )}
    </>
  );
};

export default MovieDetailsPage;
