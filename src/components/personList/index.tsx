import React from "react";
import PersonCard from "../personCard/";
import Grid from "@mui/material/Grid";
import { PersonListProps } from "../../types/interfaces";

const PersonList: React.FC<PersonListProps> = ({people}) =>{
    return (
          <Grid container spacing={2}>
         {people.map((person) =>(
          <Grid 
           key={person.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
           <PersonCard person={person} />
        </Grid>
      ))}
    </Grid>
  );
};
export default PersonList;