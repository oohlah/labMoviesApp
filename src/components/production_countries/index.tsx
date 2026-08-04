import React from "react";
import countries from "../../components/fantasyMovieForm/countriesList";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";

interface productionCountriesProp {
  control: any;
}


const productionCountries: React.FC<productionCountriesProp> = ({ control }) => {




return (
 
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
);

};


export default productionCountries;