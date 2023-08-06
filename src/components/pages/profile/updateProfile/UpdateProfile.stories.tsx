import {Meta, StoryObj} from "@storybook/react";

import {UpdateProfile} from "./UpdateProfile";
import {Provider} from "react-redux";
import {store} from "../../../../store";

const meta = {
    title: "Pages/Profile/UpdateProfile",
    component: UpdateProfile,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => <Provider store={store}><Story /></Provider>],
    tags : ["autodocs"],
} satisfies Meta<typeof UpdateProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UpdateProfilePage: Story = {
    args : {

    }
}