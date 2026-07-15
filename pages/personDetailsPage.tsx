import React from "react";
import { useParams } from "react-router-dom";
import { getPersonDetails } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import PersonDetailsCard from "../components/personDetailsCard";



const PersonDetailsPage: React.FC = () => {

     const {id} = useParams();

    const { data: person, error: personErrorMessage, isLoading: personLoading, isError: personError} = useQuery<PersonDetails, Error>(
        ["person", id],
        ()=> getPersonDetails(id||"")
      );
   

    if (personLoading ) {
    return <Spinner />;
  }

  if (personError) {
    return <h1>{(personErrorMessage as Error).message}</h1>;
  }

    if (personError) {
    return <h1>{(personErrorMessage as Error).message}</h1>;
  }
  return (

<PersonDetailsCard person={person}/>

);
};
 

export default PersonDetailsPage;