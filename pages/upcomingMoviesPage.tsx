import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlaylist from "../components/cardIcons/addToPlaylist";
import Pagination from "@mui/material/Pagination";

const UpcomingMovies: React.FC = () => {

   const [page, setPage] = React.useState(1); 
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(["upcoming", page], () => getUpcomingMovies(page),  { keepPreviousData: true });
      

 const handlePageChange = (
  event: React.ChangeEvent<unknown>,
  value: number
) => {
  console.log(value); //value changing
  setPage(value);
};


   if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

   const movies = data ? data.results : [];

  return (
    <>
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie: BaseMovieProps) => {
          return (
            <>
              <AddToPlaylist {...movie}/>
      
            </>
          );
        }}

        
        
    />

   <Pagination
           count={data?.total_pages || 10}
           color="primary" 
           page={page} 
           onChange={handlePageChange} />
    


</>

);
};
export default UpcomingMovies;
