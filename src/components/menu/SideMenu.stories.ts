import type {Meta, StoryObj} from "@storybook/react";
import {SideMenu} from "./SideMenu";

const meta = {
    title: 'SideMenu',
    component: SideMenu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],

} satisfies Meta<typeof SideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideMenuBar: Story = {
    args: {

    }
}