import {Meta, StoryObj} from "@storybook/react";

import {AddProduct} from "./AddProduct";

const meta = {
    title: "pages/product/Add product",
    component: AddProduct,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AddProduct>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddAProduct = {
    args: {

    }
}