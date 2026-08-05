import React from "react";
import countries from "../../components/fantasyMovieForm/countriesList";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, FieldErrors, Control } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import type {FantasyMovie} from "../../types/interfaces";
import Typography from "@mui/material/Typography";

interface productionCountriesProp {
  control: Control<FantasyMovie>;
  errors: FieldErrors <FantasyMovie>;

}


const productionCountries: React.FC<productionCountriesProp> = ({ control, errors }) => {




return (
 
    <>
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
     />
{errors.production_countries && (
        <Typography variant="h6" component="p">
          {errors.production_countries.message}
        </Typography>
      )}

    </>
  );
};


export default productionCountries;