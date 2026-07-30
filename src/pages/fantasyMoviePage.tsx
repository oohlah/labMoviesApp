import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FantasyMovieList from "../components/fantasyMovieCard";
import { MoviesContext } from "../contexts/moviesContext";
import Header from "../components/headerMovieList";


const FantasyMoviesPage: React.FC = () => {
  
    const title = "Fantasy Movies";
    const { fantasyMovies } = useContext(MoviesContext);

    return (
        
        <>
        <Header title={title} />
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
