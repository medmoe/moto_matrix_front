import type {Meta, StoryObj} from "@storybook/react";
import {Banner} from "./Banner";

const meta = {
    title: "Banner",
    component: Banner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Banner>

export default meta;

type Story = StoryObj<typeof meta>

export const LeftBanner: Story = {
    args: {

    }
}