import {Meta, StoryObj} from "@storybook/react";
import {GraphDescriptors} from "./GraphDescriptors";

const meta = {
    title: "GraphDescriptors",
    component: GraphDescriptors,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof GraphDescriptors>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Received = {
    args: {
        color: "#007BFF",
        description: "Received"
    }
}

export const Pending = {
    args: {
        color: "#54A6FE",
        description: "Pending",
    }
}