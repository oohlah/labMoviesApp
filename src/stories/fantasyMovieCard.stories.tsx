import type { Meta, StoryObj } from "@storybook/react";
import FantasyMovieCard from "../components/fantasyMovieCard";
import type { FantasyMovie } from "../types/interfaces";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const meta = {
  title: "Fantasy Movie Card Component/FantasyMovie",
  component: FantasyMovieCard,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <MoviesContextProvider>
            <Story />
          </MoviesContextProvider>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof FantasyMovieCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleMovie: FantasyMovie = {
  id: 1,
  title: "test_movie",
  overview: "test_movie, test_movie, test_movie, test_movie",
  genres: ["Horror"],
  release_date: "2026-06-01",
  runtime: 160,
  production_countries: ["United States", "Japan", "Ireland"],
  cast: [
    {
      personId: 1,
      actorName: "Tom Hanks",
      characterName: "Chuck Noland",
      description: "Shipwrecked on an Island",
    },
    {
      personId: 2,
      actorName: "Tom Hanks",
      characterName: "Chuck Noland",
      description: "Shipwrecked on an Island",
    },
  ],
  poster_path: "",
};

export const Basic: Story = {
  args: {
    movie: sampleMovie,
  },
};

Basic.storyName = "Default";