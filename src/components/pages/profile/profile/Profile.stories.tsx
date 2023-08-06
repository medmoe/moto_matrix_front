import {Meta, StoryObj} from "@storybook/react";
import {Provider} from "react-redux";
import {store} from "../../../../store";
import {Profile} from "./Profile";

const meta = {
    title: "Pages/Profile/Profile",
    component: Profile,
    parameters: {
        layout: "centered",
    },
    decorators: [(Story) => <Provider store={store}><Story /></Provider>],
    tags: ["autodocs"],
} satisfies Meta<typeof Profile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfilePage: Story = {
    args: {

    }
}
