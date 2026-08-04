import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import ProductionCountries from "../components/production_countries";
import Box from "@mui/material/Box";


const Wrapper = () => {
  const { control } = useForm({
    defaultValues: {
      production_countries: [],
    },
  });

  return (
    <Box sx={{ width: "40ch" }}>
      <ProductionCountries control={control} />
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