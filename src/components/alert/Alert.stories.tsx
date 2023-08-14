import {Meta, StoryObj} from "@storybook/react";

import {Alert} from "./Alert";

const meta = {
    title: "Alert",
    component: Alert,
    parameters: {
        layout: 'centered',

    },
    tags: ['autodocs'],

} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorMessage: Story = {
    args: {
        message: "Some error message"
    }
}