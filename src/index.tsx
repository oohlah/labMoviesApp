import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviePage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PersonDetailsPage from "./pages/personDetailsPage";
import FantasyMoviesPage from "./pages/fantasyMoviePage";
import FantasyMovieFormPage from "./pages/fantasyMovieFormPage";
import LoginPage from "./pages/loginPage";
import PrivateRoute from "./components/component_routes/private_route";
import SignupPage from "./pages/signupPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AuthContextProvider from "./contexts/authContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
            <SiteHeader /> 
         <LocalizationProvider dateAdapter={AdapterDayjs}>
           <AuthContextProvider>
        <MoviesContextProvider>
      <Routes>
        <Route path="/signupPage" element={<SignupPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/fantasyMovieForm" element={<PrivateRoute><FantasyMovieFormPage /></PrivateRoute>} />
        <Route path="/fantasyMovies" element={<FantasyMoviesPage />} />
        <Route path="/person/:id" element={<PersonDetailsPage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
        <Route path="/reviews/form" element={<PrivateRoute><AddMovieReviewPage /></PrivateRoute>}/>
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </MoviesContextProvider> 
        </AuthContextProvider>
       </LocalizationProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

