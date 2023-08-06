import {Meta, StoryObj} from "@storybook/react";
import {CheckCircle} from "./CheckCircle";

const meta = {
    title: "Check Circle",
    component: CheckCircle,
    parameters: {
        layout: "centered"
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CheckCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Done: Story = {
    args : {
        icon: "done",
    }
}