import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const FantasyMoviesPage: React.FC = () => {
  
    return (
        
        <>
        <h1>My Fantasy Movies</h1>
        <p> Create a Fantasy Movie</p>
         <Link to={`/fantasyMovieForm`}>
        <Button variant="outlined" size="medium" color="primary">
        Add Movie
        </Button>
        </Link>
        </> 
    )};

export default FantasyMoviesPage;
