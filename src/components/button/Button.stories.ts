import type {Meta, StoryObj} from "@storybook/react";
import { Button } from "./Button";

const meta = {
    title: 'Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: "CONTINUE",
        width: "401px",
        height: "53px",
        backgroundColor: "#007BFF",
        textColor: "#FFF",
        border: "none",
    }
}

export const Cancel: Story = {
    args: {
        label: "Cancel",
        width: "100px",
        height: "40px",
        backgroundColor: "#fff",
        textColor: "#007BFF",
        border: "1px solid #007BFF",
    }
}
