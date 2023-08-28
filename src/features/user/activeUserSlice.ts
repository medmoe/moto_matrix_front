import type {Draft, PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../store";
import {Consumer, Provider} from "../../types/userTypes";

// define a type for the slice state
export interface UserState {
    providerProfile: Provider,
    consumerProfile?: Consumer,
}

const initialState: UserState = {
    providerProfile: {
        userprofile: {
            user: {},
            profile_pic: "#",
        }
    }
}

export const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers: {
        updateProviderProfile: (state, action: PayloadAction<Provider>) => {
            state.providerProfile = action.payload;
        },
        updateConsumerProfile: (state, action: PayloadAction<Consumer>) => {
            state.consumerProfile = action.payload;
        }
    }
})

export const selectProviderProfile = (state: RootState) => state.activeUser.providerProfile;
export const selectConsumerProfile = (state: RootState) => state.activeUser.consumerProfile;
export const {updateProviderProfile, updateConsumerProfile} = activeUserSlice.actions;

export default activeUserSlice.reducer;