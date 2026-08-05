import React, { useContext,  useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../contexts/authContext";
import type { FantasyMovie} from "../../types/interfaces";
import styles from "../reviewForm/styles"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import dayjs from "dayjs";
import {addFantasyMovie} from "../../api/supabase-api";
import PosterUpload from "../../components/posterUpload";
import GenreSelector from "../../components/genreSelector";
import ProductionCountries from "../../components/production_countries"
import CastSelector from "../../components/castSelector";

const FantasyMovieForm: React.FC = () => {

     const defaultValues = {
        defaultValues: {
          title: "",
          overview: "",
          genres: [],
          release_date: "",
          runtime: 0,
          production_countries: [],
          cast: [],
          poster_path: "",
          
        }
      };



const { control, formState: { errors }, handleSubmit, reset, } = useForm<FantasyMovie>(defaultValues);

const { user } = useContext(AuthContext);

 const navigate = useNavigate();

 const [open, setOpen] = useState(false);


 const handleSnackClose = () => {
        setOpen(false);
        navigate("/movies/favourites");
       };

       

    // NEW - ADD fantasy movie to supabase
    const onSubmit: SubmitHandler<FantasyMovie> = async (fantasyMovie) => {

    if (!user) {
    console.error("No authenticated user");
    return;
  }

  try {
    await addFantasyMovie({
      ...fantasyMovie,
      users_id: user.id,
    });

    setOpen(true);

  } catch(error) {
    console.error("Failed to add fantasy movie:", error);
  }

};
 

    
      return (
        <Box component="div" sx={styles.root}>
          <Typography component="h2" variant="h3">
            Add a Fantasy Movie
          </Typography>
       
         <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
         onClose={handleSnackClose}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">
            Thank you for submitting a fantasy movie
          </Typography>
        </Alert>
      </Snackbar>


           <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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
              render={({ field }) => (
                
            <DatePicker
                label="Release Date"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) => {
                field.onChange(
                newValue ? newValue.format("YYYY-MM-DD") : ""
                );
                }}
                renderInput={(params) => (
                <TextField 
                {...params}
                sx={{ width: "40ch" }}
                margin="normal"
            />
                )}
                />
            )}
        />
           
           <GenreSelector control={control} errors={errors}/>
         

        <CastSelector control={control} errors={errors}/>


        <PosterUpload control={control}/>

        <ProductionCountries control={control} errors={errors}/>

    
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
                    production_countries: [],
                    cast: [],
                    poster_path: "",


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
