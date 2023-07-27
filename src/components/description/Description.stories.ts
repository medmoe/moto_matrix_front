import {Meta, StoryObj} from "@storybook/react";

import {Description} from "./Description";

const meta = {
    title: "Description",
    component: Description,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Description>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Title: Story = {
    args: {
        title: "$15.400",
        description: "received",
    }
}