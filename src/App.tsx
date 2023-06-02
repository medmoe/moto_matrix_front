import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SignIn} from "./features/user/login/SignIn";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
            </Routes>
        </Router>
    );
}

export default App;
