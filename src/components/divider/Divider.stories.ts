import {Meta, StoryObj} from "@storybook/react";
import {Divider} from "./Divider";

const meta = {
    title: "Divider",
    component: Divider,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Short = {
    args: {
        width: "152px",
    }
}

export const Long = {
    args: {
        width: "713px"
    }
}