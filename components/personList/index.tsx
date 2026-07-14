import React from "react";
import PersonCard from "../personCard/";
import Grid from "@mui/material/Grid";
import { PersonListProps } from "../../types/interfaces";

const PersonList: React.FC<PersonListProps> = ({people}) =>{
    const personCards = people.map((person) =>(
          <Grid key={person.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <PersonCard person={person}  />
          </Grid>
    ));
     return personCards;

}

export default PersonList;