import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import { FantasyMovie } from "../../types/interfaces"; 
import CardMedia from "@mui/material/CardMedia";
import img from '../../images/film-poster-placeholder.png';
import {supabase} from "../../lib/supbase";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
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
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.production_countries}{" "}
            </Typography>
          </Grid>
        </Grid>

         <Typography variant="h6" component="p">
        Cast:
      </Typography>

     {movie.cast.map((actor) => (
       <Typography key={actor.personId} variant="body1">
       {actor.actorName}
       </Typography>
      ))}
      </CardContent>
      <CardActions disableSpacing>
         {/* <Link to={`/movies/${movie.id}`}> */}
        <Button variant="outlined" size="medium" color="primary">
        More info ....
        </Button>
        {/* </Link> */}
      </CardActions>
    </Card>
  );
}

export default FantasyMovieCard;
