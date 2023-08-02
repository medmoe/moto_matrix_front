import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../../store";
import {CombinedUser} from "../../types/types";


// define a type for the slice state
export interface UserState {
    user: CombinedUser;
}

const initialState: UserState = {
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData: (state, action: PayloadAction<CombinedUser>) => {
            state.user = action.payload;
        }
    }
})

export const selectUserData = (state: RootState) => state.user.user;

export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;