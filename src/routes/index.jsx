import React, { lazy } from "react";
import { useRoutes, Navigate } from 'react-router-dom';

import Layout from '../components/Layout';

import Login from '../views/Login';
import Home from '../views/Home';
import Go from '../views/Go';
import Nofound from "../views/NoFound";

const Room = lazy(() => import('../views/Room'));
const RoomList = lazy(() => import('../views/RoomList'));
const Build = lazy(() => import('../views/Build'));

//不采用公用布局且不采用懒加载的页面
const frameOut = [
    { path: '/login', element: <Login /> },
    { path: "/go", element: <Go /> },
];

//从角度上看，我们可以把路由组件放在Layout里面进行劫持跳转
const frameIn = [
    { path: "index", element: <Home /> },
    { path: "setroom", element: <Room /> },
    { path: "roomlist", element: <RoomList /> },
    { path: "setbuild", element: <Build /> },
    { path: "*", element: <Nofound /> }
];

const Router = () => {
    return useRoutes([
        ...frameOut,
        {
            path: "/", element: <Navigate to="/index" />,
        },
        {
            path: "/*", element: <Layout />, children: frameIn
        }
    ]);
};
export default Router;