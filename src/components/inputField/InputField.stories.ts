import type {Meta, StoryObj} from "@storybook/react";
import {InputField} from "./InputField";

const meta = {
    title: "InputField",
    component: InputField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof InputField>

export default meta;
type Story = StoryObj<typeof meta>

export const Authentication: Story = {
    args: {
        border: "1px solid #9e9d9d",
        placeholder: "EMAIL",
        width: "307px",
        height: "53px",
        padding: "0 47px 0 47px",
        id: "email",
    }
}
