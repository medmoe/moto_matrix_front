import type {Meta, StoryObj} from "@storybook/react";
import {SignUp} from "./SignUp";

const meta = {
    title: "Sign up",
    component: SignUp,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']
} satisfies Meta<typeof SignUp>

export default meta;
type Story = StoryObj<typeof meta>

export const SignUpPage: Story = {
    args: {

    }
}