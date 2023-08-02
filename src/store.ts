import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../src/features/user/userSlice';
import dashboardReducer from '../src/features/dashboard/dashboardSlice';
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        user: userReducer,
        dashboard: dashboardReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;