import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../store";
import {AutoPartDetail} from "../../types/types";

// define a type for the slice state
export interface DashboardState {
    autoPartDetail: AutoPartDetail,
    activeIndex: number,
    pageName: string,
}

const initialState: DashboardState = {
    autoPartDetail: {},
    activeIndex: 0,
    pageName: 'dashboardPage',
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateAutoPartDetail: (state, action: PayloadAction<AutoPartDetail>) => {
            state.autoPartDetail = action.payload;
        },
        updateActiveIndex: (state, action: PayloadAction<number>) => {
            state.activeIndex = action.payload;
        },
        updatePageName: (state, action: PayloadAction<string>) => {
            state.pageName = action.payload;
        },
    }
})

export const selectAutoPartDetail = (state: RootState) => state.dashboard.autoPartDetail;
export const selectActiveIndex = (state: RootState) => state.dashboard.activeIndex;
export const selectPageName = (state: RootState) => state.dashboard.pageName;
export const {
    updateAutoPartDetail,
    updatePageName,
    updateActiveIndex
} = dashboardSlice.actions;
export default dashboardSlice.reducer;