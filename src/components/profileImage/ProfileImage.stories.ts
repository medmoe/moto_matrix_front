import {Meta, StoryObj} from "@storybook/react";

import {ProfileImage} from "./ProfileImage";

const meta = {
    title: "Profile Image",
    component: ProfileImage,
    parameters: {
        layout: "centered",
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProfileImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfilePicture = {
    args: {
        src: "https://picsum.photos/200",
        alt: "photo",
    }
}

export const UnloadedPicture = {
    args: {
        src: "#",
        alt: "photo"
    }
}