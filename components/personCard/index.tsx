import React from "react";
import { CastMember, CrewMember } from "../../types/interfaces"; 
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 350 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface PersonCardProps  {
  person: CastMember | CrewMember;
//   action: (m: BaseMovieProps) => React.ReactNode;
}

const PersonCard: React.FC<PersonCardProps> = ({person}) => {
 

  return (
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
    <CardContent>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6" component="p">
            <CalendarIcon fontSize="small" />
            {"character" in person ? person.character : person.job}
          </Typography>
        </Grid>
         <Link to={`/person/${person.id}`}>
        <Button variant="outlined" size="medium" color="primary">
        More info ....
        </Button>
        </Link>
      </Grid>
    </CardContent>
  </Card>
  );
};

export default PersonCard;
