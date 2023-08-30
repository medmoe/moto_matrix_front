import type {Meta, StoryObj} from "@storybook/react";
import { Button } from "./Button";
import MaterialIcon from 'material-icons-react';
import React from "react";

const meta = {
    title: 'Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: "CONTINUE",
        backgroundColor: "#007BFF",
        color: "#FFF",
        border: "none",
    }
}

export const Cancel: Story = {
    args: {
        label: "Cancel",
        backgroundColor: "#fff",
        color: "#007BFF",
        border: "1px solid #007BFF",
    }
}

export const Submit: Story = {
    args: {
        label: "Submit",
        backgroundColor: "#007Bff",
        color: "#fff",
        border: "none",
        icon: <MaterialIcon icon="send" size={24} color="#FFF"/>
    }
}

export const PrintOrder: Story = {
    args: {
        label: "Print Order",
        backgroundColor: "#007BFF",
        color: "#FFF",
        border: "none",
        icon: <MaterialIcon icon="print" size={24} color="#fff" />
    }
}
