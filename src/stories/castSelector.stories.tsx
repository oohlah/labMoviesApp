import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useForm, FormProvider, Control } from "react-hook-form";

import CastSelector from "../components/castSelector";
import type { FantasyMovie } from "../types/interfaces";

import peopleData from "./peopleData";



const queryClient = new QueryClient();

const meta = {
  title: "Fantasy Movie Form/Cast Selector",
  component: CastSelector,
  decorators: [
    (Story) => {
      queryClient.setQueryData(
        ["people", "Tom"],
        peopleData
      );

     
       const methods = useForm<FantasyMovie>({
        defaultValues: {
          title: "",
          overview: "",
          genres: [],
          release_date: "",
          runtime: 0,
          production_countries: [],
          cast: [],
          poster_path: "",
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <FormProvider {...methods}>
            <Story />
          </FormProvider>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof CastSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    control: {} as Control<FantasyMovie>,
    errors: {},
  },
};