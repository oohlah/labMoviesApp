import type { Meta, StoryObj } from '@storybook/react';
import FantasyMovieForm from "../components/fantasyMovieForm";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import { QueryClientProvider, QueryClient } from "react-query";


const queryClient = new QueryClient();

const meta = {
  title: "Fantasy Movie Form Component/FantasyMovie",
  component: FantasyMovieForm,
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
} satisfies Meta<typeof FantasyMovieForm>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: SampleMovie
};
Basic.storyName = "Default";