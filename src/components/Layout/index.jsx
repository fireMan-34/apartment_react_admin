import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

const LoadingUI = () => {
    return <div>
        <h2>Loading...</h2>
    </div>
}

const Layout = () => {
    return <>
        common components
        <Suspense fallback={LoadingUI}>
            <Outlet />
        </Suspense>
    </>
};
export default Layout;