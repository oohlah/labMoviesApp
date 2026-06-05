import type { Meta, StoryObj } from '@storybook/react';
import MovieHeader from "../components/movieHeader";
import SampleMovie from "./sampleData.ts";

const meta = {
    title: "Home Page/MovieHeader",
    component: MovieHeader,
} satisfies Meta<typeof MovieHeader>;
export default meta;


type Story = StoryObj<typeof meta>;
export const Basic: Story = {
        args: SampleMovie
};
Basic.storyName = "Default";

