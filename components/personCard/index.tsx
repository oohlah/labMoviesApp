import React from "react";
import { CastMember, CrewMember } from "../../types/interfaces"; 
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
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
    
    <CardContent>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6" component="p">
            <CalendarIcon fontSize="small" />
            {"character" in person ? person.character : person.job}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  );
};

export default PersonCard;
