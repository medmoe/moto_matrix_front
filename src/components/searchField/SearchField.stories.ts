import {Meta, StoryObj} from "@storybook/react";
import {SearchField} from "./SearchField";

const meta = {
    title: "SearchField",
    component: SearchField,
    parameters: {
        layout: 'centered'
    },
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;
export const SearchBar: Story = {
    args: {

    }
}