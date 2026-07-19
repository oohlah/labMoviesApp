import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { GenreData } from "../../types/interfaces";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps, FantasyMovie } from "../../types/interfaces";
import styles from "../reviewForm/styles"
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import InputLabel from "@mui/material/InputLabel";



const FantasyMovieForm: React.FC<BaseMovieProps> = (movie) => {

     const defaultValues = {
        defaultValues: {
          title: "",
          overview: "",
          genres: [],
          release_date: "",
          runtime: 0,
          production_countries: []
        }
      };

const countries = [
  "United States",
  "United Kingdom",
  "Ireland",
  "Canada",
  "France",
  "Germany",
  "Japan",
  "Australia"
];


const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);

      const {
        control,
        formState: { errors }, reset, } = useForm<FantasyMovie>(defaultValues);


        //    const navigate = useNavigate();
    //   const context = useContext(MoviesContext);
    //   const [rating, setRating] = useState(3);
    //   const [open, setOpen] = useState(false);
    

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
   
    
      return (
        <Box component="div" sx={styles.root}>
          <Typography component="h2" variant="h3">
            Write a review
          </Typography>
       

          <form style={styles.form}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={onChange}
                  value={value}
                  id="title"
                  label="Fantasy Movie Title"
                  autoFocus
                />
              )}
            />
            {errors.title && (
              <Typography variant="h6" component="p">
                {errors.title.message}
              </Typography>
            )}
            <Controller
              name="overview"
              control={control}
              rules={{
                required: "Overview cannot be empty.",
                minLength: { value: 20, message: "Overview is too short" },
              }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Overview text"
                  id="overview"
                  multiline
                  minRows={10}
                />
              )}
            />
            {errors.overview && (
              <Typography variant="h6" component="p">
                {errors.overview.message}
              </Typography>
            )}
    
   
        <Controller
              name="release_date"
              control={control}
              rules={{ required: "Release Date is required" }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={onChange}
                  value={value}
                  id="release_date"
                  label="Release Date"
                  autoFocus
                />
              )}
            />
            {errors.release_date && (
              <Typography variant="h6" component="p">
                {errors.release_date.message}
              </Typography>
            )}


          <Controller
            name="genres"
            control={control}
            rules={{ required: "Genre is required" }}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
          <FormControl sx={{ width: "40ch", marginTop: 2, display: "flex" }}>
          <InputLabel id="genre-label">Genre</InputLabel>
        <Select
            labelId="genre-label"
            id="genre-select"
            multiple={true}
            value={value}
            onChange={onChange}
        >
            {data?.genres.map((genre) => {
        return (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.name}
          </MenuItem>
        );
      })}

    </Select>
      </FormControl>
      )}
    />



          <Controller
            name="production_countries"
            control={control}
            rules={{ required: "Production Countries are required" }}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
          <FormControl sx={{ width: "40ch", marginTop: 2, display: "flex" }}>
          <InputLabel id="production-countries">Production Countries</InputLabel>
        <Select
            id="production-countries"
            multiple={true}
            value={value}
            onChange={onChange}
        >
            {countries.map((country) => {
        return (
          <MenuItem value={country}>
            {country}
          </MenuItem>
        );
      })}

    </Select>
      </FormControl>
      )}
    />
    
            <Box >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={styles.submit}
              >
                Submit
              </Button>
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                sx={styles.submit}
                onClick={() => {
                  reset({
                    title: "",
                    overview: "",
                    release_date: "",
                  });
                }}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Box>
      );
    };
    

export default FantasyMovieForm;
