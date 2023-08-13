import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../src/features/user/userSlice';
import dashboardReducer from './features/dashboard/providerDashboard/dashboardSlice';
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        userData: userReducer,
        dashboard: dashboardReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;