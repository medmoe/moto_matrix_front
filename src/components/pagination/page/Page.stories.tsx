import {Meta, StoryObj} from "@storybook/react";
import {Page} from "./Page";

const meta = {
    title: "Page",
    component: Page,
    parameters: {
        layout: "centered",
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SinglePage: Story = {
    args: {
        pageNumber: 7,
        isActive: false,
    }
}