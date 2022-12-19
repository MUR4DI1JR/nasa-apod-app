import React from 'react';
import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import {ROUTES} from "./constants/routes";

import "./style/index.css";
import AiPage from "./pages/aiPage";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home/>}/>
                <Route path={ROUTES.AI_PAGE} element={<AiPage/>}/>
            </Routes>
        </div>
    );
};

export default App;