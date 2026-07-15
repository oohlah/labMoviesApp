import React from "react";
import { PersonDetails } from "../types/interfaces";
import { useParams } from "react-router-dom";
import { getPersonDetails } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import img from '../images/film-poster-placeholder.png';

const styles = {
  card: { maxWidth: 345 },
  media: { height: 350 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

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
      <>
    {person ? (
         <Card sx={styles.card}>
   <CardHeader
     title={
          <Typography variant="h5" component="p">
            {person.name}{" "}
          </Typography>
        }
      />

   <CardMedia
        sx={styles.media}
        image={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
            : img
        }
      />
      </Card>
  
    ) : (
      <p>Waiting for person data</p>
    )}
    </>
  );
};
 

export default PersonDetailsPage;