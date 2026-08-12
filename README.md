#Description

MovieApp is a full-stack React web application designed for an interactive movie discovery and content creation experience.

Users can see trending and upcoming releases via custom pagination, and research detailed actor biographies via interactive movie credit carousels.

The platform is built around a community model where authenticated users can submit persistent movie reviews and design Fantasy Movies using real-time TMDB cast searches and personal poster uploads.

Personal lists, such as Favorites and Must-Watch, utilize lazy state initialization to ensure they remain synced and accessible even after browser refresh.

Secure session management, backend data persistence, and cloud media storage are all handled via Supabase, ensuring that all user-generated content is maintained reliably in the cloud.

#Usage

##Movie Discover and Local State Management

###API Enrichment and Caching

 The app is designed as a presentational shell that stays in sync with real-world data through TMDB API lookups. When a user lands on the Home or Upcoming pages, the app triggers a fetch to TMDB's discovery endpoints to fill the UI with movie objects.

To make the experience feel more efficient, React Query is used for server-state caching. Instead of refetching data every time a user navigates back to a page, the app stores results in a cache with a staleTime of six minutes. This prevents unnecessary network requests and ensures the UI loads instantly for frequently visited views.

source: src/api/tmdb.ts

```ts

export const getMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  ).then((response) => {
    if (!response.ok) throw new Error("Unable to fetch movies.");
    return response.json();
  });
};

```

##Pagination

Movie discovery is implemented using a reusable custom pagination hook, allowing pagination state to be shared across multiple pages while keeping UI components stateless.

The usePagination hook encapsulates the current page number together with the page change handler required by Material UI's Pagination component. By separating the pagination logic from the presentation layer, page state can be managed independently of the UI, making the component reusable throughout the application.

```js
const UsePagination= (): PaginationProp =>{
  
    const [page, setPage] = React.useState(1); 

    const handlePageChange = (
      _event: React.ChangeEvent<unknown>, //intentionally unused
      value: number
    ) => {
      console.log(value); //value changing
      setPage(value);
    };

return {
page,
handlePageChange

};
};

```

The hook is integrated with React Query by including the current page number as part of the query key:

```js
 const { page, handlePageChange }= UsePagination(); //destructure UsePagination function
  
   const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(["discover", page], () => getMovies(page),  { keepPreviousData: true }); // still show page one when page 2 is loading
   const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

```

Including the page number in the query key causes React Query to treat each page as a separate cached resource. As users navigate between pages, previously visited results are retrieved directly from the cache whenever possible, reducing unnecessary network requests and improving perceived performance.

The keepPreviousData preserves the current page of movie results while the next page is being requested. This prevents the interface from briefly becoming empty during page transitions and gives a smoother user experience.

The reusable PaginationComponent acts as a presentation layer around Material UI's Pagination component, receiving the current page, total page count, and page change handler as props. This separation keeps the pagination logic reusable and independent of the UI.


##Public and Private Route Protection

The application uses route protection through a reusable PrivateRoute component built with React Router. Instead of adding authentication checks directly into each individual page, protected pages are wrapped with PrivateRoute, allowing the authentication logic to be managed in one central location and reused throughout the application.

When a user attempts to access a protected route, PrivateRoute performs an asynchronous authentication check using auth.isUser(). While the authentication status is being verified, a loading message is displayed. If the user is authenticated, the requested page is rendered. If no authenticated user is found, the user is redirected to the login page.

Before redirecting, the current location is stored using React Router's navigation state:


'''js

return <Navigate to="/loginPage" state={{ from: location }} replace />;

'''

This allows the application to remember the page the user originally attempted to access by storing it in state.from.

A custom useAuthLocation hook is used to retrieve this stored location:

```js

if (from) { navigate(from.pathname, { state: from.state, }); } else { navigate("/"); }

```

This means users can continue from where they left off rather than having to manually navigate back to the page they originally requested.

Protected routes are defined within the main routing configuration by wrapping pages that require authentication with the PrivateRoute component:

```js
<Route path="/reviews/form" element={ <PrivateRoute> <AddMovieReviewPage /> </PrivateRoute> } />

<Route path="/fantasyMovieForm" element={ <PrivateRoute> <FantasyMovieFormPage /> </PrivateRoute> } />

```

Authentication is kept separate from individual page components, which makes it eaier to add additional protected features while maintaining the same authentication flow across the application.

##Cast / Crew Details

###Movie Credits & Person Image Carousel

The movie details page was extended to display the people involved in each movie. The movie ID is taken from the URL using React Router's useParams() hook. This ID is then used to request the movie's credits from TMDB using React Query.


```js
    const { id } = useParams();
 
 ...

  const {data: credits, isLoading: creditsLoading, isError: creditsError, error: creditsErrorMessage,
} = useQuery<MovieCredits, Error>(
  ["credits", id],
  () => getMovieCredits(id || "")
);

```

The returned credits contain separate cast and crew arrays. These are passed to a MovieCreditsSection, which filters the crew members into different categories before displaying them.

The cast is taken directly from the cast array, while the crew is filtered using the department property.

```js
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
```

This allows the same credits data to be separated into Cast, Directors, Writers and Production sections without making additional API requests.

Each filtered array is passed to the same reusable ImageCarousel component.

```js

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
```

The carousel accepts both CastMember and CrewMember objects through a union type:

```js
interface ImageCarouselProps {
people: (CastMember | CrewMember)[]; 
}
```

The carousel uses Embla Carousel to provide horizontal scrolling. Each person is mapped into a slide containing a PersonCard, while the Previous and Next buttons use the Embla API to control the current position.

```js
  const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: false,
  slidesToScroll: "auto",
});
```

The same carousel component can be reused for all four credit categories. The data passed to it determines which people are displayed, while the carousel itself is responsible only for displaying and navigating the results.


###Actor Details - Filtering

The person details page uses the person ID from the URL to retrieve the person's details and movie credits from TMDB. The credits contain separate cast and crew arrays, which are combined so that all associated movies can be displayed together.

The combined list is processed to remove duplicate movies using the movie ID as the Map key.

const allMovies = [...movieCredits.cast, ...movieCredits.crew];

const uniqueMovies = Array.from(
  new Map(allMovies.map(movie => [movie.id, movie])).values()
);

The movies are then filtered and sorted into two lists. The popular movies are ordered by TMDB popularity and limited to ten results, while the full list is filtered to movies with a release date and ordered from newest to oldest.

```js
  const allMovies = [...movieCredits!.cast, ...movieCredits!.crew];

     //map out duplicates
    const uniqueMovies = Array.from(
    new Map(allMovies.map(movie => [movie.id, movie])).values()
    );

  //order from most to least, and use only 10
  const popularMovies = uniqueMovies
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 10);

  //convert release_date string to num and sort
  const orderedMovies = [...allMovies]
  .filter(movie => movie.release_date)
  .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

```

Both lists are displayed using the reusable MovieImageCarousel, which also allows the existing favourite action to be used for each movie.

###Person Details Card

The person's TMDB data is displayed using a reusable PersonDetailsCard component. The component presents the person's profile image, biography and key information such as their birthday, place of birth, department and popularity. Material UI's responsive Grid component is used to arrange this information into separate sections that adapt to different screen sizes.

##Advanced Forms

###Dynaimc Cast Selection

The fantasy movie form allows users to search for actors from TMDB and create a dynamic cast list. The form uses React Hook Form, React Query and Material UI's Autocomplete component to search the TMDB API and create additional form fields for the selected actors.

The cast functionality is handled by a separate CastSelector component. The parent FantasyMovieForm creates the form using useForm, while the control object and validation errors are passed to the CastSelector.

```js
 interface CastSelectorProps {
  control: Control<FantasyMovie>;
  errors: FieldErrors<FantasyMovie>;
}
```

The control object allows the dynamically generated cast fields to remain part of the same form state. The errors object allows validation errors for individual cast members to be displayed within the CastSelector.

Actor searching is handled using React Query. The search term is stored in local state and used as part of the query key. A request is only made once at least two characters have been entered.

```js
const { data: personData, error: personErrorMessage, isError: personError  } = useQuery<PersonList, Error>(["people", searchWord],
  () => SearchPeople(searchWord),
  {
    enabled: searchWord.length > 1,
  }
);
```

React Query handles the API request and caches the results using the query key. When the search term changes, a new query is made.

When actors are selected, the TMDB results are converted into the application's cast structure. The complete TMDB objects are not stored. Instead, the form stores the actor's TMDB ID and the fields required for the fantasy movie.

```js
  replace(people.map(person => ({
          personId: person.id,
          actorName: person.name,
          characterName: "",
          description: "",
        })));

      }}
```

The replace() function comes from React Hook Form's useFieldArray. It replaces the existing cast array with the currently selected actors, keeping the form state in sync with the Autocomplete selection.

The component then creates form fields for each actor in the cast array.

```js
 {fields.map((member, index) => (
        <Box key={member.id}>
          <Typography>{member.actorName}</Typography>

          <Controller
            name={`cast.${index}.characterName`}
            control={control}
            rules={{
              required: "Character Name cannot be empty.",
              minLength: {
                value: 1,
                message: "Please enter character name",
              },
            }}
            render={({ field }) => (
              <TextField {...field} label="Character Name" />
            )}
          />
```

Each field uses React Hook Form's Controller to connect Material UI components such as TextField and Autocomplete to the form state.

Character names and descriptions are validated for each cast member. Since the fields are stored inside the cast array, validation errors are accessed using the relevant array index.

###Date Picker 

The fantasy movie form uses Material UI's DatePicker for the release date. The release_date field is stored as a string rather than a number so that it matches the format used by the TMDB API.

The DatePicker works with a Day.js date object, so the selected value is converted back into a string when the user selects a date.

```js
<Controller
              name="release_date"
              control={control}
              rules={{ required: "Release Date is required" }}
              defaultValue=""
              render={({ field }) => (
                
            <DatePicker
                label="Release Date"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue) => {
                field.onChange(
                newValue ? newValue.format("YYYY-MM-DD") : ""
                );
                }}
                renderInput={(params) => (
                <TextField 
                {...params}
                sx={{ width: "40ch" }}
                margin="normal"
            />
                )}
                />
            )}
        />
           
```

This means the DatePicker can use a Day.js object for displaying and selecting the date, while the form state stores a string such as "2026-08-08". This matches the release_date format returned by TMDB and means the value can be stored and submitted without needing additional conversion.

The LocalizationProvider is placed around the application in index.tsx and provides the date adapter required by the Material UI DatePicker.

```js
<LocalizationProvider dateAdapter={AdapterDayjs}>
  ...
</LocalizationProvider>
```

Using AdapterDayjs tells the DatePicker how to handle the dates it receives.

###Supabase Image API Storage

The form also allows users to upload a poster for their fantasy movie. The image is uploaded to a Supabase Storage bucket rather than being stored directly in the database.

```js
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
```

A unique file path is created using the current timestamp and the original filename. This prevents files from overwriting each other. The storage path is stored with the fantasy movie data, and the actual image file remains in cloud-base Supabase storage.

The database only stores a reference to the uploaded image instead of the image data itself. The stored path can then be used to retrieve the poster when the fantasy movie is displayed.

##Authentication with Supabase

The application uses Supabase Authentication to manage user accounts and sessions. A Supabase client is created using the project's URL and publishable key, which are stored as Vite environment variables rather than being written directly into the source code.

```js
import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(
 import.meta.env.VITE_SUPABASE_URL,
 import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);
```

The login page uses Supabase's signInWithPassword() method to authenticate the user's email and password. The response contains either an error or a session, which is used to determine whether the login was successful.

```js
const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    
   });


    if(error){
    console.log(error.status); // get status code
    setMessage(error.message);
    return;
   }


   if(data.session){
    setMessage(`User logged in with email: ${email}`);
    console.log("NAVIGATING TO:", from);
     // redirect to home page on login
    // SHOULD NAV TO PREV LOCATION - oe homepage if no state.location
      if (from) {
     navigate(from.pathname, {
      state: from.state,
     });   // fix - include state, losing id from review form
   }else{
    navigate("/");
    setMessage("Log in Failed");
   }
}
}
  
```



Authentication operations are kept in a separate auth service rather than being repeated throughout the application. The isUser() function calls Supabase's getUser() method and converts the returned user object into a boolean. This is used by PrivateRoute when checking whether a user can access a protected page.

```js

import supabase from "../lib/supbase";

const auth = {
  async isUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return !!user;
  },


  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  },
};

...

```


The current authenticated user is also made available throughout the application using an AuthContextProvider. The provider wraps the application's routes, allowing components to access the current user through AuthContext without having to retrieve the user independently.

```js
<AuthContextProvider>

      ...

</AuthContextProvider>

```

For example, the Fantasy Movie form uses the authenticated user's ID when submitting a new movie to Supabase.

```js

const { user } = useContext(AuthContext);

...

 if (!user) {
    console.error("No authenticated user");
    return;
  }

  try {
    await addFantasyMovie({
      ...fantasyMovie,
      users_id: user.id,
    });
    ...

  };

```

This separates the authentication responsibilities within the application: Supabase manages authentication and sessions, the auth service provides reusable authentication operations, and AuthContext makes the current user available to components that need it. The PrivateRoute component then uses the authentication service to control access to protected routes.


##Supabase Database & User Data

Supabase is also used as the application's persistent database for user-generated content, including fantasy movies and movie reviews. The database tables were created and configured through the Supabase console, with columns matching the TypeScript interfaces used by the application.

The fantasy_movies and movie_reviews tables both contain a users_id column configured as a foreign key to the authenticated user's ID. This links each piece of user-generated content to the user who created it. Row Level Security (RLS) policies were also configured in the Supabase console to control which authenticated users can insert and access data. Row Level Security (RLS) policies were also configured in the Supabase console to control which authenticated users can insert and access data. 

The Supabase API calls are kept in a separate supabase-api file rather than being written directly inside page components. For example, retrieving all fantasy movies uses the Supabase client's select() method.

```ts

export const getFantasyMovies =async () => {
  const { data, error } = await supabase
    .from("fantasy_movies")
    .select("*");

  if (error) throw error;

  return data;
};
```

A separate function retrieves only the fantasy movies belonging to a particular user by filtering the users_id column.

```js
export const getUserFantasyMovies =async (id: string) => {
  const { data, error } = await supabase
    .from("fantasy_movies")
    .select("*")
    .eq("users_id", id);

  if (error) throw error;

  return data;
};
```

The authenticated user's ID comes from AuthContext and is passed to this function. The query is only enabled once a user ID is available.

```js
  const { user} = useContext(AuthContext);

    const { data: userFantasyMovies, isLoading: userMoviesLoading, error: userMoviesError 
} = useQuery<FantasyMovie[]>(["userFantasyMovies", user?.id],
  () => getUserFantasyMovies(user!.id),
  {
    enabled: !!user?.id
  }
);
```

This allows the application to distinguish between all fantasy movies stored in the database and the movies created by the currently authenticated user.

New fantasy movies and reviews are added using Supabase's insert() method. The submitted objects are passed directly to the relevant table, with errors being returned to the component.

```js
 const { data, error } = await supabase
    .from("fantasy_movies")
    .insert([
      fantasyMovie
    ])
    .select();
```

The database therefore handles persistent storage while the supabase-api functions provide a small abstraction layer between the database and the React components. React Query is then used by the pages to manage the resulting server state.


###Favourites and Must-Watch List

Favourites and Must-Watch Lists

The Favourites and Must-Watch lists use React Context and localStorage rather than the Supabase database. The lists are stored as arrays of movie IDs.

Lazy initialisation is used when creating the state so that localStorage is checked only when the state is initially created:

```js
    //lazy initialisatoin to fetch favourites from storage
   const [favourites, setFavourites] = useState<number[]>(() => {
  const saved = localStorage.getItem("favourites");
  return saved ? JSON.parse(saved) : [];
});

const [mustWatch, setMustWatch] = useState<number[]>(() => {
  const saved = localStorage.getItem("mustWatch");
  return saved ? JSON.parse(saved) : [];
});
```

This means that when the application loads, any previously saved favourites and Must-Watch movies are retrieved from the browser rather than starting with empty arrays. useEffect then keeps localStorage synchronised whenever either state value changes.

```js

//update local storage when state changes
useEffect(() => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}, [favourites]);


useEffect(() => {
  localStorage.setItem("mustWatch", JSON.stringify(mustWatch));
}, [mustWatch]);

```
The lists are provided through MoviesContext, allowing components such as movie cards and movie detail pages to access and update them without passing the data through multiple levels of props.


##Tech Stack

###Frontend

- React 18: Library for building the user interface

- TypeScript: Type-safe development environment for robust component logic

- Vite: Build tool and development server for high-performance HMR

- Material UI (MUI): Core component library for layout, grids, and UI elements like the DatePicker and Autocomplete

- Embla Carousel: Library used to build interactive, touch-friendly image galleries for cast and movie credits

- React Hook Form: For managing complex, multi-step form states and validations

###Backend & Infrastructure

- Supabase (BaaS): Used as the primary backend for database persistence and cloud media storage

- Supabase Auth: Handles secure user authentication and session management

- Supabase Storage: Cloud-based bucket for storing user-uploaded movie posters

- State Management & Data Fetching
TanStack React Query: Manages asynchronous server state, API enrichment, and sophisticated caching (staleTime/keepPreviousData)

- React Context API: Handles global state for Authentication and local UI lists like Favorites and Must-Watch

- Lazy Initialization: Used to efficiently sync local state with localStorage on initial mount

####External APIs
- TMDB API: Primary source for movie metadata, actor biographies, and credits

- TMDB Search API: Utilized for real-time actor lookups within the Fantasy Movie Form

####Deployment & Tooling
- Vercel: Cloud platform for hosting the production application

- Storybook: Comprehensive component documentation suite for testing UI elements in isolation

##Deployment & Media

- Github:  https://github.com/oohlah/labMoviesApp

- Deployment (Vercel): https://lab-movies-app-3zan.vercel.app/

- Video Resource:  https://youtu.be/YIRSwhySXYI

##References

Convert string to number using newDate() and getTime() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

Multi-select for dropdown form https://mui.com/material-ui/react-select/

Pagination with Tanstack/ react query https://www.contentful.com/blog/react-pagination/

Pagination Component https://mui.com/material-ui/react-pagination/

Setting page in useQuery for pagination https://www.youtube.com/watch?v=9ZbdwL5NSuQ 

Installing Supabase https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

Private route component https://dev.to/kirbyaguilar/setting-up-private-routes-with-react-router-v6-527l

Supbase login/signup https://www.youtube.com/watch?v=Q7-DI39epR8 

Check Authentication with private route: https://onecompiler.com/tutorials/react/routing/protected-routes

useEffect to check for authentication https://stackoverflow.com/questions/78057558/can-useeffect-be-used-to-check-whether-the-user-token-is-present-in-the-localsto
 

Supabase getUser() https://supabase.com/docs/reference/javascript/auth-getuser

For Ref later - JWT authentication with Supabase https://www.freecodecamp.org/news/set-up-authentication-in-apps-with-supabase/#password-based-authentication

Embla image carousel with React set up https://www.embla-carousel.com/docs/get-started/react

Embla grouping Slide for multiple images in carousel: https://www.embla-carousel.com/docs/guides/grouping-slides

Using autocomplete search component to search and select actors from TMDB person search results https://stackoverflow.com/questions/76372068/react-mui-autocomplete-input-controlled-with-react-hook-form-controller-com

Handle props in useFieldArray https://react-hook-form.com/docs/usefieldarray/fieldarray

Implement start of datepicker: https://mui.com/x/react-date-pickers/quickstart/

Date calendar as date picker https://mui.com/x/react-date-pickers/date-calendar/

React imag upload https://www.youtube.com/watch?v=XeiOnkEI7XI

Uploading file to supabase https://www.youtube.com/watch?v=ch2UGHMreB0&t=30s

Lazy initialisation to fetch from local storage - favourites and watchlist https://medium.com/@VinitKumarGupta/react-best-practices-implementing-lazy-initialization-with-usestate-c8405059191e

Fix: vercel 404 error on refresh https://medium.com/@bonfacealfonce/the-one-line-fix-that-instantly-solves-page-refresh-404-errors-on-vercel-vite-react-65cc83f30c0a


