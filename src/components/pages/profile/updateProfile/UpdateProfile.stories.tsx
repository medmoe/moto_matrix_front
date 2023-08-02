import {Meta, StoryObj} from "@storybook/react";

import {UpdateProfile} from "./UpdateProfile";

const meta = {
    title: "Pages/Profile/UpdateProfile",
    component: UpdateProfile,
    parameters: {
        layout: "centered",
    },
    tags : ["autodocs"],
} satisfies Meta<typeof UpdateProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UpdateProfilePage: Story = {
    args : {

    }
}