import {Meta, StoryObj} from "@storybook/react";

import {UpperBar} from "./UpperBar";
import {SearchField} from "../searchField/SearchField";
import {Button} from "../button/Button";

const meta = {
    title: "UpperBar",
    component: UpperBar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof UpperBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
    args: {
        components: [<SearchField />],
        left: "635px",
    },
}

export const Orders: Story = {
    args: {
        components: [<SearchField />],
        left: "635px",
        title: "Orders",
        subtitle: "15 orders found",
    }
}

export const UpdateProfile: Story = {
    args: {
    }
}
