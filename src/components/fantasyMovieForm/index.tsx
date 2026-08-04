import React, { useContext,  useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { AuthContext } from "../../contexts/authContext";
import type { FantasyMovie, PersonList} from "../../types/interfaces";
import styles from "../reviewForm/styles"
// import countries from "./countriesList";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
// import Spinner from '../spinner';
// import InputLabel from "@mui/material/InputLabel";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { SearchPeople } from "../../api/tmdb-api";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import dayjs from "dayjs";
import {addFantasyMovie} from "../../api/supabase-api";
import PosterUpload from "../../components/posterUpload";
import GenreSelector from "../../components/genreSelector";
import ProductionCountries from "../../components/production_countries"

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
 const [searchWord, setSearchWord] = useState("");
//  let castMembers: FantasyCastMember[]= [];

//manage cast array, replace cast array with updated fields
 const { fields, replace} = useFieldArray({
  control,
  name: "cast",
});




 const { data: personData, error: personErrorMessage, isLoading: personLoading, isError: personError  } = useQuery<PersonList, Error>(["people", searchWord],
  () => SearchPeople(searchWord),
  {
    enabled: searchWord.length > 1,
  }
);

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
 

   
      if (personError) {
    return <h1>{(personErrorMessage as Error).message}</h1>;
  }
    
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
           
           <GenreSelector control={control}/>
         

<Controller
  name="cast"
  control={control}
  defaultValue={[]}
  render={({ field }) => (
    <Autocomplete
      multiple
      options={personData?.results ?? []}
      getOptionLabel={(option) => option.name}

      onChange={(_, people) => {

        replace(people.map(person => ({
          personId: person.id,
          actorName: person.name,
          characterName: "",
          description: "",
        })));

      }}

      inputValue={searchWord}

      onInputChange={(_, value) => {
        setSearchWord(value);
      }}

      renderInput={(params) => (
        <TextField {...params} label="Cast" />
      )}
    />
  )}
/>

{/* UseFieldArray for dynamic character name fields! */} 
{/* // get dynamic inputs for each cast member */}
 {fields.map((member, index) => {
    return(
   <Box key={member.id}>
    <Typography>{member.actorName}</Typography>
<Controller
  name={`cast.${index}.characterName`}
  control={control}
  rules={{     required: "Character Name cannot be empty.",
               minLength: { value: 1, message: "Please enter character name" },
              }}
  //display text, merge with cast array
  render={({ field }) => (
     <TextField {...field} label="Character Name" />
  )}
/>

<Controller
  name={`cast.${index}.description`}
  control={control}
  rules={{     required: "Description cannot be empty.",
               minLength: { value: 5, message: "Please enter character description" },
              }}
 
  render={({ field }) => (
     <TextField  multiline fullWidth minRows={3}{...field} label="Character Description" />
        )}
      />
    </Box>
  );
})}

<PosterUpload control={control}/>

<ProductionCountries control={control}/>
{/* 
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
           {countries.map((country) => (
          <MenuItem key={country} value={country}>
         {country}
          </MenuItem>
        ))}

    </Select>
      </FormControl>
      )}
    /> */}
    
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
