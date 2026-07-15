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
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

const styles = {
  card: {
    maxWidth: 1800,
    margin: "2rem auto",
    padding: 2,
  },
  media: {
    height: 600,
    width: "100%",
    objectFit: "contain",
    borderRadius: 2,
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
      <Typography variant="h4">
        {person.name}
      </Typography>
    }
    subheader={person.known_for_department}
  />

  <CardMedia
    sx={styles.media}
    image={
      person.profile_path
        ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
        : img
    }
  />

  <CardContent>
  <Grid container spacing={4}>

    {/* Sidebar */}
    <Grid item xs={12} md={3}>
      <Typography gutterBottom>
        <strong>Birthday:</strong> {person.birthday ?? "Unknown"}
      </Typography>

      <Typography gutterBottom>
        <strong>Place of Birth:</strong> {person.place_of_birth ?? "Unknown"}
      </Typography>

      <Typography gutterBottom>
        <strong>Department:</strong> {person.known_for_department}
      </Typography>

      <Typography gutterBottom>
        <strong>Popularity:</strong> {person.popularity}
      </Typography>

      {person.deathday && (
        <Typography gutterBottom>
          <strong>Died:</strong> {person.deathday}
        </Typography>
      )}
    </Grid>

    {/* Photo */}
    <Grid item xs={12} md={3}>
      <CardMedia
        component="img"
        image={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
            : img
        }
        alt={person.name}
        sx={{
          width: "100%",
          borderRadius: 2,
        }}
      />
    </Grid>

    {/* Biography */}
    <Grid item xs={12} md={6}>
      <Typography variant="h5" gutterBottom>
        Biography
      </Typography>

      <Typography variant="body1">
        {person.biography || "No biography available."}
      </Typography>
    </Grid>

  </Grid>
</CardContent>
</Card>
  
  
    ) : (
      <p>Waiting for person data</p>
    )}
    </>
  );
};
 

export default PersonDetailsPage;