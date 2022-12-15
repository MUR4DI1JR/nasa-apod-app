import React from 'react';
import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import {ROUTES} from "./constants/routes";

import "./style/index.css";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home/>}/>
            </Routes>
        </div>
    );
};

export default App;