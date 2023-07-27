import {Meta, StoryObj} from "@storybook/react";
import {DonutChart} from "./DonutChart";

const meta = {
    title: "DonutChart",
    component: DonutChart,
    parameters: {
        layout: "centered",

    },
    tags: ["autodocs"],

} satisfies Meta<typeof DonutChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Chart: Story = {
    args: {
        percentage: 67,
    }
}