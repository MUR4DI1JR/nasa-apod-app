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
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./redux/slices/auth";
import CreatePost from "./pages/CreatePost";

const App = () => {
    const dispatch = useDispatch();

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
                    <Route path={ROUTES.CREATE_POST} element={<CreatePost/>}/>
                    <Route path={`${ROUTES.CREATE_POST}/:id/edit`} element={<CreatePost/>}/>
                </Routes>
            </div>
        </>

    );
};

export default App;