import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import {ROUTES} from "./constants/routes";

import "./style/index.css";
import AiPage from "./pages/aiPage";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostPage from "./pages/PostPage";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectUser} from "./redux/slices/auth";

const App = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectUser);

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, []);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div>
                <Header/>
                <Routes>
                    <Route path={ROUTES.HOME} element={<Home/>}/>
                    <Route path={ROUTES.AI_PAGE} element={<AiPage/>}/>
                    <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                    <Route path={ROUTES.REGISTER} element={<RegisterPage/>}/>
                    <Route path={`${ROUTES.POSTS}/:id`} element={<PostPage/>}/>
                </Routes>
            </div>
        </>

    );
};

export default App;