import React from "react"; // replace existing react import
import {  MovieCredits, CrewMember } from "../../types/interfaces";
import ImageCarousel from "../personImageCarousel";


interface MovieCreditsSectionProps {
  credits: MovieCredits;
}

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
        

        
         <h2>Cast</h2>
        <ImageCarousel people={actors}>
        </ImageCarousel>


        <h2>Directors </h2>
        <ImageCarousel people={directors}>
        </ImageCarousel>

        <h2>Writers</h2>
         <ImageCarousel people={writers}>
        </ImageCarousel>

        <h2>Production</h2>
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
