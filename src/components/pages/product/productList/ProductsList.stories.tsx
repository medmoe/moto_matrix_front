import {Meta, StoryObj} from "@storybook/react";

import {ProductsList} from "./ProductsList";

const meta = {
    title: "Pages/Product/Products List",
    component: ProductsList,
    parameters: {
        layout: "centered",
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProductsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductsListPage: Story = {
    args : {

    }
}