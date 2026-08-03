
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

//TEST CODE

//calling it on the page

// const [fantasyMovie, setFantasyMovie] = useState([]);

//with useEffect - temp will change

// useEffect(() => {

//     getFantasyMovies();
// }), []); // get all No dependecies

// useEffect(() => {

//     getFantasyMovies();
// }), [id]); // get all No dependecies // need to get the user id from the params or superbase??