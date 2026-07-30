import React from "react";
import type { PersonMovieCredits } from "../../types/interfaces";
import MovieImageCarousel from "../../components/movieImageCarousel";


interface PersonMovieCreditsProps  {
  movieCredits: PersonMovieCredits;
//   action: (m: BaseMovieProps) => React.ReactNode;
}

const PersonMovieCreditsSection: React.FC <PersonMovieCreditsProps>= ({movieCredits}) =>{
  
     const allMovies = [...movieCredits!.cast, ...movieCredits!.crew];

     //map out duplicates
    const uniqueMovies = Array.from(
    new Map(allMovies.map(movie => [movie.id, movie])).values()
    );

  //order from most to least, and use only 10
  const popularMovies = uniqueMovies
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 10);

  //convert release_date string to num and sort
  const orderedMovies = [...allMovies]
  .filter(movie => movie.release_date)
  .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());


  return (
    <>
   {movieCredits ? (
  <>
   


 <h2>Popular Movies</h2>
   <MovieImageCarousel movies={popularMovies}>
        </MovieImageCarousel>



 <h2>All Movies</h2>
  <MovieImageCarousel movies={orderedMovies}>
        </MovieImageCarousel>
</>
 ): (
      <p>Waiting for movie credits...</p>
    )}
  </>
);
  
};

export default PersonMovieCreditsSection;
