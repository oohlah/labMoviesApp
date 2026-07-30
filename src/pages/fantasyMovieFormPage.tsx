import React from "react";
import FantasyMovieForm from "../components/fantasyMovieForm";
import Header from "../components/headerMovieList";

const FantasyMoviesFormPage: React.FC = () => {
  
    const title = "Your Fantasy Movie";

    return (
        
        <>
      <Header title={title}></Header>
       <FantasyMovieForm/>
        </> 
    )};

export default FantasyMoviesFormPage;
