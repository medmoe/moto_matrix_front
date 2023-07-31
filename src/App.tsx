import React from 'react';
import './App.css';
import {SignIn} from "./features/user/login/SignIn";
import {SignUp} from "./features/user/signup/SignUp";
import {Dashboard} from "./features/dashboard/Dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {PrivateRoutes} from "./components/auth/PrivateRoutes";

function App() {
    return (
        <Router>
            <Routes>
                /* authentication routes */
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                /* app routes */
                {/*<Route path="/dashboard" element={<Dashboard />} />*/}
                <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
