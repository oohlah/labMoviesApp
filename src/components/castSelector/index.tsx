import React, {useState} from "react";
import type { PersonList, FantasyMovie} from "../../types/interfaces";
import { Controller, Control, useFieldArray} from "react-hook-form";
import { useQuery } from "react-query";
import { SearchPeople } from "../../api/tmdb-api";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

  interface CastSelectorProps {
  control: Control<FantasyMovie>;
}

const CastSelector: React.FC <CastSelectorProps> = ({control}) => {

  

 const [searchWord, setSearchWord] = useState("");


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

    if (personError) {
    return <h1>{(personErrorMessage as Error).message}</h1>;
  }
    

return (

<>
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
 
 {fields.map((member, index) => (
        <Box key={member.id}>
          <Typography>{member.actorName}</Typography>

          <Controller
            name={`cast.${index}.characterName`}
            control={control}
            rules={{
              required: "Character Name cannot be empty.",
              minLength: {
                value: 1,
                message: "Please enter character name",
              },
            }}
            render={({ field }) => (
              <TextField {...field} label="Character Name" />
            )}
          />

          <Controller
            name={`cast.${index}.description`}
            control={control}
            rules={{
              required: "Description cannot be empty.",
              minLength: {
                value: 5,
                message: "Please enter character description",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                fullWidth
                minRows={3}
                label="Character Description"
              />
            )}
          />
        </Box>
      ))}

    </> 
  );
}; 

export default CastSelector;