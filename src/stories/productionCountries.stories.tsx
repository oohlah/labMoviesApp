import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import ProductionCountries from "../components/production_countries";
import Box from "@mui/material/Box";
import type { FantasyMovie } from "../types/interfaces";

const Wrapper = () => {
  const { control, formState: {errors}  } = useForm<FantasyMovie>({
    defaultValues: {
      production_countries: [],
    },
  });

  return (
    <Box sx={{ width: "40ch" }}>
      <ProductionCountries control={control} errors={errors} />
    </Box>
  );
};


const meta: Meta<typeof ProductionCountries> = {
  title: "Fantasy Movie/Production Countries",
  component: ProductionCountries,
  decorators: [
    (Story) => (
      <Box sx={{ padding: 4 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProductionCountries>;


export const Default: Story = {
  render: () => <Wrapper />,
};