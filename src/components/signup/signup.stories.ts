import type {Meta, StoryObj} from "@storybook/react";
import {Signup} from "./Signup";

const meta = {
    title: "Signup",
    component: Signup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']

}satisfies Meta<typeof Signup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignUpForm: Story = {
    args: {

    }
}