import {Meta, StoryObj} from "@storybook/react";

import {Select} from "./Select";

const meta = {
    title: 'Select',
    component: Select,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const conditions: Story = {
    args: {
        options: [["NEW", "NEW"], ["USED", "USED"], ["REFURBISHED", "REFURBISHED"]]
    }
}