export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    genre_ids?: number[];
  }

  export interface BaseMovieListProps { 
    movies: BaseMovieProps[];
    action: (m: BaseMovieProps) => React.ReactNode;
  }  

    export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[];
    production_countries: {
    iso_3166_1: string;
    name: string;
    }[];
  }

  export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

//FilterOption not an object shape - a set of allowed values
export type FilterOption = "title" | "genre";


export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}

 export interface Review{
    id: string;
    content: string
    author: string
  }

  export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
}

export interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

  export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
  }

  export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
}

  export interface CastMember extends Person{
  character: string;
  order: number;
}

export interface CrewMember extends Person{
  job: string;
  department: string;
}

export interface BasePersonMovieCredit extends BaseMovieProps {
  credit_id: string;
  original_title: string;
}

export interface PersonCastCredit extends BasePersonMovieCredit {
  character: string;
  order: number;
}

export interface PersonCrewCredit extends BasePersonMovieCredit {
  job: string;
  department: string;
}

export interface PersonMovieCredits {
  cast: PersonCastCredit[];
  crew: PersonCrewCredit[];
}

export interface PersonListProps {
  people: (CastMember[] | CrewMember[]);
}


export interface MovieCredits {
  cast: CastMember[];
  crew: CrewMember[];
}

  export interface MovieCreditsListProps { 
    credits: MovieCredits[];
  } 

  export interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}

 export interface FantasyMovie {
  id: number;
  title: string;
  overview: string;
  genres: string[];
  release_date: string;
  runtime: number;
  production_countries: string[];

}

 export interface FantasyMovieListProps { 
    movies: FantasyMovie[];

  }  

  export interface PaginationProp {
    page: number;
   handlePageChange: (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => void;
  }