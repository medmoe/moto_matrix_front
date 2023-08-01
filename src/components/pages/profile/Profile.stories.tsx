import {Meta, StoryObj} from "@storybook/react";

import {Profile} from "./Profile";

const meta = {
    title: "Profile",
    component: Profile,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Profile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfilePage: Story = {
    args: {

    }
}
