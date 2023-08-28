import {configureStore} from "@reduxjs/toolkit";
import userReducer from './features/user/activeUserSlice';
import dashboardReducer from '../src/features/dashboard/dashboardSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        activeUser: userReducer,
        dashboard: dashboardReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;