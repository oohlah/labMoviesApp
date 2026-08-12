import React from "react"; // replace existing react import
import {  MovieCredits, CrewMember } from "../../types/interfaces";
import ImageCarousel from "../personImageCarousel";
import SectionHeading from "../../components/sectionHeading";

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
        


      <SectionHeading>Actors</SectionHeading>
        <ImageCarousel people={actors}>
        </ImageCarousel>


         <SectionHeading>Directors</SectionHeading>
      
        <ImageCarousel people={directors}>
        </ImageCarousel>

    

          <SectionHeading>Writers</SectionHeading>
      
         <ImageCarousel people={writers}>
        </ImageCarousel>


   <SectionHeading>Production</SectionHeading>
      
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
