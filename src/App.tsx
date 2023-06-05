import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SignIn} from "./features/user/login/SignIn";
import {SignUp} from "./features/user/signup/SignUp";
import {Dashboard} from "./features/dashboard/Dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                /* authentication routes */
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                /* app routes */
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
