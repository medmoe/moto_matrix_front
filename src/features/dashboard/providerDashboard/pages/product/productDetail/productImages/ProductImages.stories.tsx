import {Meta, StoryObj} from "@storybook/react";

import {ProductImages} from "./ProductImages";

const meta = {
    title: 'Pages/Product/ProductDetail/Product images',
    component: ProductImages,
    parameters: {
        layout: "centered",
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProductImages>

export default meta;

type Story = StoryObj<typeof meta>;

export const Large = {
    args: {
        images: ['https://picsum.photos/40', 'https://picsum.photos/40', 'https://picsum.photos/40', 'https://picsum.photos/40', 'https://picsum.photos/40']
    }
}