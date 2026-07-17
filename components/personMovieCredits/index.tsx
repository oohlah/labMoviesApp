import React from "react";
import Grid from "@mui/material/Grid";
import Header from "../../components/headerMovieList";
import MovieList from "../../components/movieList";
import type { PersonMovieCredits } from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

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
   

 <Grid container sx={styles.root} spacing={2}>
     <Grid item xs={12}>
       <Header title={popularMovies[0].title} />
      </Grid>

       <Grid item xs={12}>
    <h2>Popular Movies</h2>
    </Grid>

      <Grid item xs={12}>
    <Grid container spacing={5}>
     <MovieList movies={popularMovies} action={() => null} />
         </Grid>
     </Grid>
</Grid>


{/* All Movies */}
    <Grid container sx={styles.root} spacing={2}>
     <Grid item xs={12}>
       <Header title={orderedMovies[0].original_title} />
      </Grid>

       <Grid item xs={12}>
    <h2>All Movies</h2>
    </Grid>

      <Grid item xs={12}>
    <Grid container spacing={5}>
     <MovieList movies={orderedMovies} action={() => null} />
         </Grid>
     </Grid>
</Grid>
</>
 ): (
      <p>Waiting for movie credits...</p>
    )}
  </>
);
  
};

export default PersonMovieCreditsSection;
