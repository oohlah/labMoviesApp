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
import SectionHeading from "../components/sectionHeading";



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

  <SectionHeading>Create a Fantasy Movie</SectionHeading>
        
         <Link to={`/fantasyMovieForm`}>
        <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        >
        Add Movie
       </Button>
        </Link>
        
  
      
      <SectionHeading>Your Fantasy Movie</SectionHeading>
       <FantasyMovieCarousel 
         movies={userFantasyMovies ?? []}
         />

       
         <SectionHeading>All Fantasy Movies</SectionHeading>

      <FantasyMovieCarousel 
         movies={fantasyMovies ?? []}
         />
       </>
    )};

export default FantasyMoviesPage;
