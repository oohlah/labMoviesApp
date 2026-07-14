import React from "react";
import { MovieCredits } from "../../types/interfaces"; 
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import CardContent from "@mui/material/CardContent";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface PersonCardProps  {
  credits: MovieCredits;
//   action: (m: BaseMovieProps) => React.ReactNode;
}

const PersonCard: React.FC<PersonCardProps> = ({credits}) => {
 
// const { favourites, addToFavourites, removeFromFavourites } = useContext(MoviesContext);//NEW

//    const { mustWatch, addToMustWatch } = useContext(MoviesContext);


// const isFavourite = favourites.find((id) => id === movie.id)? true : false;//NEW

//  const isMustWatch = mustWatch.find((id) => id === movie.id)? true : false;

// {action(movie)}

//   const handleRemoveFromFavourite = (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//       removeFromFavourites(movie);
//   };
  return (
   <Card sx={styles.card}>
    <Typography variant="h5" component="p">
      {credits.cast[0]?.name}
    </Typography>

    <CardContent>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6" component="p">
            <CalendarIcon fontSize="small" />
            {credits.cast[0]?.character}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  );
};

export default PersonCard;
