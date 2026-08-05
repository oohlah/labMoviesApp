import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useQuery } from "react-query";
import Typography from "@mui/material/Typography";
import { getGenres } from "../../api/tmdb-api";
import type { GenreData, FantasyMovie } from "../../types/interfaces";

interface GenreSelectorProps {
  control: Control<FantasyMovie>;
  errors: FieldErrors <FantasyMovie>;
}


const GenreSelector: React.FC<GenreSelectorProps> = ({ control, errors}) => {


const { data: genreData, isLoading, error } = useQuery<GenreData, Error>(
  "genres",
  getGenres
);


if (isLoading) {
  return <p>Loading genres...</p>;
}


if (error) {
  return <p>Error loading genres</p>;
}


return (
    <>
  <Controller
    name="genres"
    control={control}
    rules={{ required: "Genre is required" }}
    render={({ field }) => (
      <FormControl 
        sx={{ 
          width: "40ch", 
          marginTop: 2, 
          display: "flex" 
        }}
      >

        <InputLabel id="genre-label">
          Genre
        </InputLabel>


        <Select
          labelId="genre-label"
          multiple
          value={field.value}
          onChange={field.onChange}
        >

        {genreData?.genres.map((genre) => (
          <MenuItem
            key={genre.id}
            value={genre.name}
          >
            {genre.name}
          </MenuItem>
        ))}

        </Select>

      </FormControl>
    )}
  />
   {errors.genres && (
        <Typography variant="h6" component="p">
          {errors.genres.message}
        </Typography>
      )}

    </>
  );
};

export default GenreSelector;