import React, {MouseEvent, useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import AddToPlaylistIcon from "@mui/icons-material/PlaylistAdd";
import {BaseMovieProps} from "../../types/interfaces";

const AddToPlaylist: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <AddToPlaylistIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylist;