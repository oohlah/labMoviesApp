import React from "react";
import type { PersonMovieCredits, BaseMovieProps } from "../../types/interfaces";
import MovieImageCarousel from "../../components/movieImageCarousel";
import Typography from "@mui/material/Typography";

interface PersonMovieCreditsProps  {
  movieCredits: PersonMovieCredits;
action: (m: BaseMovieProps) => React.ReactNode;
 }

 const styles = {
  sectionHeading: {
    paddingTop: "16px",
    paddingBottom: "16px",
     fontSize: "1.5rem",
    fontWeight: "semi-bold",
  },
};

const PersonMovieCreditsSection: React.FC <PersonMovieCreditsProps>= ({movieCredits, action}) =>{
  
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
   


<Typography variant="h5" component="h2"
     sx={styles.sectionHeading}>
    Popular Movies
</Typography>
   <MovieImageCarousel movies={popularMovies} action={action}>
        </MovieImageCarousel>


<Typography variant="h5" component="h2"
     sx={styles.sectionHeading}>
    All Movies
</Typography>

  <MovieImageCarousel movies={orderedMovies} action={action}>
        </MovieImageCarousel>
</>
 ): (
      <p>Waiting for movie credits...</p>
    )}
  </>
);
  
};

export default PersonMovieCreditsSection;
