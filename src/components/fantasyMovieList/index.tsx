import React from "react";
import FantasyMovie from "../fantasyMovieCard";
import Grid from "@mui/material/Grid";
import { FantasyMovieListProps } from "../../types/interfaces";

const FantasyMovieList: React.FC<FantasyMovieListProps> = ({movies}) =>{
    const movieCards = movies.map((m) =>(
          <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FantasyMovie key={m.id} movie={m} />
          </Grid>
    ));
      
     return movieCards;

     

}

export default FantasyMovieList;