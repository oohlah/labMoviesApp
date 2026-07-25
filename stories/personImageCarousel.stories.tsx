import type { Meta, StoryObj } from '@storybook/react';
import ImageCarousel from "../components/personImageCarousel";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import { QueryClientProvider, QueryClient } from "react-query";


const queryClient = new QueryClient();

const meta = {
  title: "Image CarouselComponent/ImageCarousel",
  component: ImageCarousel,
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
} satisfies Meta<typeof ImageCarousel>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
  people: People,
},
};
Basic.storyName = "Default";