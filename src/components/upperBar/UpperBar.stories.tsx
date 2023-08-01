import {Meta, StoryObj} from "@storybook/react";

import {UpperBar} from "./UpperBar";
import {SearchField} from "../searchField/SearchField";
import {Button} from "../button/Button";
import MaterialIcon from 'material-icons-react';

const meta = {
    title: "UpperBar",
    component: UpperBar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof UpperBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
    args: {
        components: [<SearchField/>],
        left: "635px",
    },
}

export const Orders: Story = {
    args: {
        components: [<SearchField/>],
        left: "635px",
        title: "Orders",
        subtitle: "15 orders found",
    }
}

export const UpdateProfile: Story = {
    args: {
        title: "Update Profile",
        left: "810px",
        subtitle: "Update Profile to Reflect the New You",
        components: [<Button label="Cancel"
                             width="100px"
                             height="40px"
                             border="1px solid #007BFF"
                             backgroundColor="#FFF"
                             textColor="#007BFF"/>,
            <Button label="Submit"
                    width="100px"
                    height="40px"
                    backgroundColor="#007BFF"
                    textColor="#fff"
                    border="none" icon={<MaterialIcon icon="send" size={24} color="#fff"/>}/>]
    }
}
