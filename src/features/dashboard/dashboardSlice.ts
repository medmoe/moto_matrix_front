import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";

export interface DashboardState {
    activeIndex: number,
}

const initialState: DashboardState = {
    activeIndex: 0,
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateActiveIndex: (state, action:PayloadAction<number>) => {
            state.activeIndex = action.payload;
        }
    }
})

export const selectActiveIndex = (state: RootState) => state.dashboard.activeIndex;
export const { updateActiveIndex } = dashboardSlice.actions;
export default dashboardSlice.reducer;