import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FantasyMovie } from "../../types/interfaces"; 
import CardMedia from "@mui/material/CardMedia";
import img from '../../images/film-poster-placeholder.png';
import {supabase} from "../../lib/supbase";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import { Link } from "react-router-dom";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  link: {
      color: "#1976d2",
      textDecoration: "underline",
      fontWeight: 600,

  },
};

interface FantasyMovieCardTemp {
    movie: FantasyMovie;
}

const FantasyMovieCard: React.FC<FantasyMovieCardTemp> = ({movie}) => {
 
    console.log("MOVIE OBJECT", movie);

const { data } = supabase.storage
  .from("test_bucket")
  .getPublicUrl(`${movie.poster_path}`);

console.log("Image URL:", data.publicUrl);

  return (
    <Card sx={styles.card}>
         <CardHeader
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />

      <CardMedia
              sx={styles.media}
              image={movie.poster_path? data.publicUrl : img}
              
            />
     
      <CardContent>

<Typography variant="body1">
        <strong>Overview:</strong>{" "}
         </Typography>
    <Typography variant="body2">
        {movie.overview}
    </Typography>
    <Typography variant="body1">
        <strong>Production Countries:</strong>{" "}
         </Typography>
    <Typography variant="body2">
        {movie.production_countries.join(", ")}
    </Typography>

    <Typography variant="body1">
        <strong>Genres:</strong> 
    </Typography>
     <Typography variant="body2">
        {movie.genres.join(", ")}
    </Typography>

    <Typography variant="body1">
        <strong>Cast:</strong>
    </Typography>

        {movie.cast.map((actor) => (
            <Box
    key={actor.personId}>

    <Typography variant="body2">
  <strong>Name:</strong>{" "}
  <Link 
    style={styles.link}
    to={`/person/${actor.personId}`}
  >
    {actor.actorName}
  </Link>
</Typography>
     <Typography variant="body2">
        <strong>Character:</strong> {actor.characterName}
     </Typography>
        <Typography variant="body2">
        <strong>Character Desciption:</strong> 
        {actor.description}
    </Typography>
     </Box>
  ))}
   <Typography variant="body1">
       <CalendarIcon fontSize="small" sx={{pl: 1,}} />  <strong> Release Date: </strong>
              {movie.release_date}
              
            </Typography>
</CardContent>
    
    </Card>
  );
}

export default FantasyMovieCard;
