import type {Meta, StoryObj} from "@storybook/react";

import {MenuItem} from "./MenuItem";

const meta = {
    title: 'MenuItem',
    component: MenuItem,
    parameters: {
        layout: 'centered',

    },
    tags: ['autodocs'],

} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
    args: {
        icon: "dashboard",
        title: "Dashboard",
        backgroundColor: "#706500"
    }
}

export const Orders: Story = {
    args: {
        icon: "list_alt",
        title: "Orders",
        backgroundColor: "#706500"

    }
}

export const Inventory: Story = {
    args: {
        icon: "inventory_2",
        title: "Inventory",
        backgroundColor: "#706500"

    }
}

export const Logout: Story = {
    args: {
        icon: "logout",
        title: "Logout",
        backgroundColor: "#706500"

    }
}

export const Analytics: Story = {
    args: {
        icon: "analytics",
        title: "Analytics",
        backgroundColor: "#706500"

    }
}

export const AnalyticsActive: Story = {
    args: {
        icon: "analytics",
        title: "Analytics",
        backgroundColor: "#877B04"
    }
}