import React from 'react';
import {DashboardWindow, SignIn, SignUp} from "./features";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {PrivateRoutes} from "./components/auth/PrivateRoutes";

function App() {
    return (
        <Router>
            <Routes>
                /* authentication routes */
                <Route path="/" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                /* app routes */
                <Route element={<PrivateRoutes/>}>
                    <Route path="/dashboard" element={<DashboardWindow/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
