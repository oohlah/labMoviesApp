import React from "react"; // replace existing react import
import {  MovieCredits, CrewMember } from "../../types/interfaces";
import PersonList from "../../components/personList";


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
         <PersonList people={actors}/>

        <h2>Directors</h2>
        <PersonList people={directors}/>

        <h2>Writers</h2>
        <PersonList people={writers}/>

        <h2>Production</h2>
        <PersonList people={producers}/>
        
        
      </>
    ) : (
      <p>Waiting for data</p>
    )}
    </>
  );
};

export default MovieCreditsSection;
