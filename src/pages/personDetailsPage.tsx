import React, { useContext }from "react";
import { useParams } from "react-router-dom";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import PersonDetailsCard from "../components/personDetailsCard";
import { PersonMovieCredits, PersonDetails} from "../types/interfaces";
import PersonMovieCreditsSection from '../components/personMovieCredits';
import Header from "../components/headerMovieList";
import { MoviesContext } from "../contexts/moviesContext";
import type { BaseMovieProps } from "../types/interfaces";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";



const PersonDetailsPage: React.FC = () => {

const { addToFavourites } = useContext(MoviesContext);

const action = (movie: BaseMovieProps) => (
  <Button 
    onClick={() => addToFavourites(movie)}
  >
    <FavoriteIcon />
  </Button>
);

     const {id} = useParams();

    const { data: person, error: personErrorMessage, isLoading: personLoading, isError: personError} = useQuery<PersonDetails, Error>(
        ["person", id],
        ()=> getPersonDetails(id||"")
      );
   
       const { data: movieCredits, error: movieCreditsErrorMessage, isLoading: movieCreditsLoading, isError: movieCreditsError} = useQuery<PersonMovieCredits, Error>(
        ["personMovieCredits", id],
        ()=> getPersonMovieCredits(id||"")
      );

  

    if (personLoading || movieCreditsLoading  ) {
    return <Spinner />;
  }

  if (personError || movieCreditsError ) {
    return <h1>{(personErrorMessage as Error).message}</h1>;
  }

    if (personError) {
    return <h1>{(personErrorMessage as Error).message}</h1>;
  }

   if (movieCreditsError) {
    return <h1>{(movieCreditsErrorMessage as Error).message}</h1>;
  }

  
  return (
  <>

    <Header title={person!.name}/>
    <PersonDetailsCard person={person!} />


    <PersonMovieCreditsSection movieCredits={movieCredits!} action={action}/>
</>

);
};
 

export default PersonDetailsPage;