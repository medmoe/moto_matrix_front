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
        components: [<SearchField handleChangeOnSearchField={() => console.log("search")}/>],
    },
}

export const Orders: Story = {
    args: {
        components: [<SearchField handleChangeOnSearchField={() => console.log("search")}/>],
        title: "Orders",
        subtitle: "15 orders found",
    }
}

export const UpdateProfile: Story = {
    args: {
        title: "Update ProfileImage",
        subtitle: "Update ProfileImage to Reflect the New You",
        components: [<Button label="Cancel"
                             border="1px solid #007BFF"
                             backgroundColor="#FFF"
                             color="#007BFF"/>,
            <Button label="Submit"
                    backgroundColor="#007BFF"
                    color="#fff"
                    border="none" icon={<MaterialIcon icon="send" size={24} color="#fff"/>}/>]
    }
}
