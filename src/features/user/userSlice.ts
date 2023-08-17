import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../store";
import {UserProfile} from "../../types/userTypes";

// define a type for the slice state
export interface UserState {
    userData: UserProfile,
}

const initialState: UserState = {
    userData: {
        user: {}
    },
}

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        updateUserData: (state, action: PayloadAction<UserProfile>) => {
            state.userData = action.payload;
        },
    }
})

export const selectUserData = (state: RootState) => state.userData.userData;

export const {updateUserData} = userSlice.actions;

export default userSlice.reducer;