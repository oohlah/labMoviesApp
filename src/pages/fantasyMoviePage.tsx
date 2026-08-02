import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FantasyMovieList from "../components/fantasyMovieCard";
import Header from "../components/headerMovieList";
import AddIcon from "@mui/icons-material/Add";
import { getFantasyMovies} from "../api/supabase-api";
import { useQuery } from "react-query";


const FantasyMoviesPage: React.FC = () => {
  
    const title = "Fantasy Movies";
   
const { data: fantasyMovies, isLoading, error } = useQuery(
    "fantasyMovies",
    getFantasyMovies
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
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

        <h2>All Fantasy Movies</h2>
        {fantasyMovies?.map(movie => (
 
        <FantasyMovieList key={movie.id} movie={movie}/> // ADD MOVIE DATA
        ))};
        
        </> 
    )};

export default FantasyMoviesPage;
