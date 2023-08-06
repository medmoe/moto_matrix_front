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
        width: "140px",
        height: "140px",
    }
}

export const UnloadedPicture = {
    args: {
        src: "#",
        alt: "photo",
        width: "140px",
        height: "140px",
    }
}

export const smallPicture = {
    args: {
        src: "#",
        alt: "profile photo",
        width: "50px",
        height: "50px",
    }
}

export const smallLoadedPicture = {
    args: {
        src: "https://picsum.photos/200",
        alt: "profile photo",
        width: "50px",
        height: "50px",
    }
}