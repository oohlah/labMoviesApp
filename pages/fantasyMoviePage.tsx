import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FantasyMovieList from "../components/fantasyMovieCard";
import { MoviesContext } from "../contexts/moviesContext";



const FantasyMoviesPage: React.FC = () => {
  
    const { fantasyMovies } = useContext(MoviesContext);

    return (
        
        <>
        <h1>My Fantasy Movies</h1>
        {fantasyMovies.map(movie => (
 
        <FantasyMovieList key={movie.id} movie={movie}/> // ADD MOVIE DATA
        ))};
        <p> Create a Fantasy Movie</p>
         <Link to={`/fantasyMovieForm`}>
        <Button variant="outlined" size="medium" color="primary">
        Add Movie
        </Button>
        </Link>
        </> 
    )};

export default FantasyMoviesPage;
