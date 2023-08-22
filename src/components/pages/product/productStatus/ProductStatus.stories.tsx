import {Meta, StoryObj} from "@storybook/react";

import {ProductStatus} from "./ProductStatus";

const meta = {
    title: 'Pages/Product/ProductStatus',
    component: ProductStatus,
    parameters: {
        layout: 'centered',
    },
    tags: ['autotags'],
} satisfies Meta<typeof ProductStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllProducts: Story = {
    args: {
        title: "All products",
        isActive: true,
    }
}
