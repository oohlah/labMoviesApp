import React from "react";
import { useParams } from "react-router-dom";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import PersonDetailsCard from "../components/personDetailsCard";
import MovieList from "../components/movieList";
import { PersonMovieCredits, PersonDetails} from "../types/interfaces";
import Grid from "@mui/material/Grid";
import Header from "../components/headerMovieList";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};


const PersonDetailsPage: React.FC = () => {

     const {id} = useParams();

    const { data: person, error: personErrorMessage, isLoading: personLoading, isError: personError} = useQuery<PersonDetails, Error>(
        ["person", id],
        ()=> getPersonDetails(id||"")
      );
   
       const { data: movieCredits, error: movieCreditsErrorMessage, isLoading: movieCreditsLoading, isError: movieCreditsError} = useQuery<PersonMovieCredits, Error>(
        ["personMovieCredits", id],
        ()=> getPersonMovieCredits(id||"")
      );

  

    if (personLoading || movieCreditsLoading  ) {
    return <Spinner />;
  }

  if (personError || movieCreditsError ) {
    return <h1>{(personErrorMessage as Error).message}</h1>;
  }

    if (personError) {
    return <h1>{(personErrorMessage as Error).message}</h1>;
  }

   if (movieCreditsError) {
    return <h1>{(movieCreditsErrorMessage as Error).message}</h1>;
  }

  
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
  .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  return (
  <>
   {person && movieCredits ? (
    <>
    <PersonDetailsCard person={person!} />

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
 

export default PersonDetailsPage;