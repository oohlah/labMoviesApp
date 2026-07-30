import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlaylist from "../components/cardIcons/addToPlaylist";
import Pagination from "@mui/material/Pagination";
import UsePagination from "../hooks/usePagination";
import type { PaginationProp} from "../types/interfaces";

const UpcomingMovies: React.FC = () => {

  const {page, handlePageChange}: PaginationProp = UsePagination();

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(["upcoming", page], () => getUpcomingMovies(page),  { keepPreviousData: true });
      


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
