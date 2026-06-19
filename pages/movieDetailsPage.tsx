import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";

import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";

const MovieDetailsPage: React.FC= () => {
  const { id } = useParams();
   const [movie] = useMovie(id ?? "");



  return (
    <>
      {movie ? ( //ternarary operator - only display page if it's ready to render
        <>
        <PageTemplate movie={movie}>
          <MovieDetails {...movie} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default MovieDetailsPage;
