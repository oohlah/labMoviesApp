import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleData.ts";

const meta = {
    title: "Home Page/MovieCard",
    component: MovieCard,
} satisfies Meta<typeof MovieCard>;
export default meta;


type Story = StoryObj<typeof meta>;
export const Basic: Story = {
         args: {
    movie: SampleMovie,
    selectFavourite: (movieId) => {
      console.log(movieId);
    },
  },
};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
export const Exceptional: Story = {
     args: {
    movie: sampleNoPoster,
    selectFavourite: (movieId) => {
      console.log(movieId);
    },
  },
};

Exceptional.storyName = "Exception";