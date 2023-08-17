import {Meta, StoryObj} from "@storybook/react";
import {Pagination} from "./Pagination";

const meta = {
    title: 'Pagination',
    component: Pagination,
    parameters: {
        layout: "centered"
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PaginationBar: Story =  {
    args: {
        numberOfPages: 10,
        activePage: 1,
    }
}