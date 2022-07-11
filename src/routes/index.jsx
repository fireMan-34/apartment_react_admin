import React, { lazy } from "react";
import { useRoutes, Navigate } from 'react-router-dom';

import Layout from '../components/Layout';

import Home from '../views/Home';

const frameOut = [

];

const frameIn = [
    { path: "index", element: <Home /> }
];

const Router = () => {
    return useRoutes([
        {
            path: "/", element: <Navigate to="/index" />,
        },
        {
            path: "/*", element: <Layout />, children: frameIn
        }
    ]);
};
export default Router;