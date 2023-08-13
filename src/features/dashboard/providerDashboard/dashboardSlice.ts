import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../store";

export interface DashboardState {
    activeIndex: number,
    pageName: string,
}

const initialState: DashboardState = {
    activeIndex: 0,
    pageName: 'dashboardPage'
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateActiveIndex: (state, action: PayloadAction<number>) => {
            state.activeIndex = action.payload;
        },
        updatePageName: (state, action: PayloadAction<string>) => {
            state.pageName = action.payload;
        }
    }
})

export const selectActiveIndex = (state: RootState) => state.dashboard.activeIndex;
export const selectPageName = (state: RootState) => state.dashboard.pageName;
export const {updateActiveIndex, updatePageName} = dashboardSlice.actions;
export default dashboardSlice.reducer;