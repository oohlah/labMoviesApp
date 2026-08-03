import React, { useContext}from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FantasyMovieList from "../components/fantasyMovieCard";
import Header from "../components/headerMovieList";
import AddIcon from "@mui/icons-material/Add";
import { getFantasyMovies, getUserFantasyMovies} from "../api/supabase-api";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/authContext";
import type { FantasyMovie} from "../types/interfaces";


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

        <h2>Create a Fantasy Movie</h2>
         <Link to={`/fantasyMovieForm`}>
        <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        >
        Add Movie
       </Button>
        </Link>

        <h2>Your Fantasy Movies</h2>
        {userFantasyMovies?.map(movie => (
 
 
        <FantasyMovieList key={movie.id} movie={movie}/> // ADD MOVIE DATA
        ))};
        <h2>All Fantasy Movies</h2>
        {fantasyMovies?.map(movie => (
 

        <FantasyMovieList key={movie.id} movie={movie}/> // ADD MOVIE DATA
        ))};
        
        </> 
    )};

export default FantasyMoviesPage;
