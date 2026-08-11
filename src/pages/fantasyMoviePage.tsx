import React, { useContext}from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Header from "../components/headerMovieList";
import AddIcon from "@mui/icons-material/Add";
import { getFantasyMovies, getUserFantasyMovies} from "../api/supabase-api";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/authContext";
import type { FantasyMovie} from "../types/interfaces";
import FantasyMovieCarousel from "../components/fantasyMovieCarousel";
import Typography from "@mui/material/Typography";


const styles = {
  sectionHeading: {
    paddingTop: "16px",
    paddingBottom: "16px",
     fontSize: "1.5rem",
    fontWeight: "semi-bold",
  },
};


const FantasyMoviesPage: React.FC = () => {
  
    const title = "Fantasy Movies";
   
    //GET logged in user info from context
     const { user} = useContext(AuthContext);

    const { data: userFantasyMovies, isLoading: userMoviesLoading, error: userMoviesError 
} = useQuery<FantasyMovie[]>(["userFantasyMovies", user?.id],
  () => getUserFantasyMovies(user!.id),
  {
    enabled: !!user?.id
  }
);

const { data: fantasyMovies, isLoading: moviesLoading, error: movieserror } = useQuery<FantasyMovie[]>(
    "fantasyMovies",
    getFantasyMovies
  );

  if (userMoviesLoading || moviesLoading) {
    return <p>Loading...</p>;
  }

  if (movieserror || userMoviesError ) {
    return <p>Error loading fantasy movies</p>;
  }


    return (
        
        <>
        <Header title={title} />
<Typography variant="h5" component="h2"
     sx={styles.sectionHeading}>
    Create a Fantasy Movie
</Typography>
        
         <Link to={`/fantasyMovieForm`}>
        <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        >
        Add Movie
       </Button>
        </Link>
        
        <Typography variant="h5" component="h2"
             sx={styles.sectionHeading}>
    Your Fantasy Movies
     </Typography>
  
      
       <FantasyMovieCarousel 
         movies={userFantasyMovies ?? []}
         />

<Typography variant="h5" component="h2"
     sx={styles.sectionHeading}>
    All Fantasy Movies
</Typography>
       

      <FantasyMovieCarousel 
         movies={fantasyMovies ?? []}
         />
       </>
    )};

export default FantasyMoviesPage;
