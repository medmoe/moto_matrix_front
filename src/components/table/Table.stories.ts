import {Meta, StoryObj} from "@storybook/react";

import {Table} from "./Table";

const meta = {
    title: "Table",
    component: Table,
    parameters: {
        layout: "centered",

    },
    tags: ["autodocs"],

} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small = {
    args: {
        data: [
            {Name: "Mohammed Bekhouche Abdelghafour", Quantity: 100, Date: "2023-07-30", Status: "Paid"},
            {Name: "Noah David", Quantity: 50, Date: "2023-07-29", Status: "Paid"},
            {Name: "Joe Shmoe", Quantity: 0, Date: "2023-07-28", Status: "Pending"},
            {Name: "Joe Doe", Quantity: 200, Date: "2023-07-27", Status: "Canceled"},
            {Name: "Xiang Li", Quantity: 30, Date: "2023-07-26", Status: "Paid"},
        ],
        columns: [
            "Name", "Quantity", "Date", "Status"
        ]
    }
}