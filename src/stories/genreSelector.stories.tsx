import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useForm } from "react-hook-form";
import GenreSelector from "../components/genreSelector";
import type { FantasyMovie } from "../types/interfaces";


const queryClient = new QueryClient();


const GenreSelectorWrapper = () => {

  const { control } = useForm<FantasyMovie>({
    defaultValues: {
      genres: [],
    },
  });


  return (
    <QueryClientProvider client={queryClient}>
      <GenreSelector control={control} />
    </QueryClientProvider>
  );
};



const meta: Meta<typeof GenreSelector> = {
  title: "Fantasy Movie/GenreSelector",
  component: GenreSelector,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;


type Story = StoryObj<typeof GenreSelector>;


export const Default: Story = {
  render: () => <GenreSelectorWrapper />,
};