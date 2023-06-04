import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SignIn} from "./features/user/login/SignIn";
import {SignUp} from "./features/user/signup/SignUp";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
