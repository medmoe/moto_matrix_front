import {Meta, StoryObj} from "@storybook/react";

import {Rating} from "./Rating";

const meta = {
    title: "Rating",
    component: Rating,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RatingBar = {
    args: {
        rate: 3,
    }
}