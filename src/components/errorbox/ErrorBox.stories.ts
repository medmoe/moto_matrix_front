import type {Meta, StoryObj} from "@storybook/react";
import {ErrorBox} from "./ErrorBox";

const meta = {
    title: "ErrorBox",
    component: ErrorBox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']
} satisfies Meta<typeof ErrorBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorMessage: Story = {
    args: {
        message: "some error message!"
    }

}