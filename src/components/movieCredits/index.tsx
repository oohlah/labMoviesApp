import React from "react"; // replace existing react import
import {  MovieCredits, CrewMember } from "../../types/interfaces";
import ImageCarousel from "../personImageCarousel";
import Typography from "@mui/material/Typography";

interface MovieCreditsSectionProps {
  credits: MovieCredits;
}

 const styles = {
  sectionHeading: {
    paddingTop: "16px",
    paddingBottom: "16px",
     fontSize: "1.5rem",
    fontWeight: "semi-bold",
  },
};

const MovieCreditsSection: React.FC <MovieCreditsSectionProps>= ({credits}) => {

 

console.log("Credits data:", credits);


  const actors = credits?.cast;

  const directors = credits?.crew.filter(
  (person: CrewMember) => person.department === "Directing"
);

const writers = credits?.crew.filter(
  (person: CrewMember) => person.department === "Writing"
);

const producers = credits?.crew.filter(
  (person: CrewMember) => person.department === "Production"
);

  return (
    <>
      {credits ? ( //ternarary operator - only display page if it's ready to render
        <>
        

        
       
         <Typography variant="h5" component="h2"
     sx={styles.sectionHeading}>
    Cast
    </Typography>
        <ImageCarousel people={actors}>
        </ImageCarousel>

   <Typography variant="h5" component="h2"
        sx={styles.sectionHeading}>
         Directors
      </Typography>
      
        <ImageCarousel people={directors}>
        </ImageCarousel>

     <Typography variant="h5" component="h2"
        sx={styles.sectionHeading}>
        Writers
       </Typography>
      
         <ImageCarousel people={writers}>
        </ImageCarousel>

        <Typography variant="h5" component="h2"
         sx={styles.sectionHeading}>
         Production
        </Typography>
      
         <ImageCarousel people={producers}>
        </ImageCarousel>
        
        
      </>
    ) : (
      <p>Waiting for data</p>
    )}
    </>
  );
};

export default MovieCreditsSection;
