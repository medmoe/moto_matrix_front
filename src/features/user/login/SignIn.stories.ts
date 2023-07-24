import type {Meta, StoryObj} from "@storybook/react";
import {SignIn} from "./SignIn";

const meta = {
    title: "Sign in",
    component: SignIn,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']
} satisfies Meta<typeof SignIn>

export default meta;
type Story = StoryObj<typeof meta>

export const SignInPage: story = {
    args: {

    }
}