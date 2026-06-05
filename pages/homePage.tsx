import React from "react";
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../components/movieList";
import { BaseMovieListProps } from "../types/interfaces";

const styles = {
    root: {
        padding: "20px"
    },
};

//access movies property directly instead of full props object ({movies}) VS (props.movies)
const MovieListPage: React.FC<BaseMovieListProps> = ({movies}) =>{
    return (

       <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList movies={movies}></MovieList>
      </Grid>
    </Grid>
    );
};

export default MovieListPage;