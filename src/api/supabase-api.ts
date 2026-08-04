
import supabase from "../lib/supbase";



// this is how I'll fetch the data in supabase-api
export const getFantasyMovies =async () => {
  const { data, error } = await supabase
    .from("fantasy_movies")
    .select("*");

  if (error) throw error;

  return data;
};

// Add a fantasy movie
export const addFantasyMovie = async (fantasyMovie: FantasyMovie) => {

  const { data, error } = await supabase
    .from("fantasy_movies")
    .insert([
      fantasyMovie
    ])
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserFantasyMovies =async (id: string) => {
  const { data, error } = await supabase
    .from("fantasy_movies")
    .select("*")
    .eq("users_id", id);

  if (error) throw error;

  return data;
};

//REVIEWS

export const addMovieReview = async (review: Review) => {

  const { error } = await supabase
    .from("movie_reviews")
    .insert([
      review
    ]);

  if (error) {
    throw error;
  }
};

const STORAGE_BUCKET = "test_bucket";

export const uploadPoster = async (file: File) => {

      const filePath = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  return data.path;

}