import {Meta, StoryObj} from "@storybook/react";

import {Spinner} from "./Spinner";

const meta = {
    title: "Spinner",
    component: Spinner,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"]
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
    args: {

    }
}