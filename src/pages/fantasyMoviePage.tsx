import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FantasyMovieList from "../components/fantasyMovieCard";
import { MoviesContext } from "../contexts/moviesContext";
import Header from "../components/headerMovieList";
import AddIcon from "@mui/icons-material/Add";

const FantasyMoviesPage: React.FC = () => {
  
    const title = "Fantasy Movies";
    const { fantasyMovies } = useContext(MoviesContext);

    return (
        
        <>
        <Header title={title} />

        <p> Create a Fantasy Movie</p>
         <Link to={`/fantasyMovieForm`}>
        <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        >
        Add Movie
       </Button>
        </Link>
        {fantasyMovies.map(movie => (
 
        <FantasyMovieList key={movie.id} movie={movie}/> // ADD MOVIE DATA
        ))};
        
        </> 
    )};

export default FantasyMoviesPage;
