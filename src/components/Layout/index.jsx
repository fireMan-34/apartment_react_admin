import './index.scss';

import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';
import { Suspense } from 'react';

const { Header, Sider, Content } = Layout;

import HeaderNav from './HeaderNav';
import SiderNav from './SiderNav';
import Loading from './Loding';
import { LoginGuard } from '../LoginGuard/';
// const LoginGuard = withLoginGuard(() => <Outlet />)

//通过全局状态数据获取导航信息，而不依赖于页面具体传参

const LayoutCom = () => {
    return <Layout className='layout'>
        <Sider><SiderNav /></Sider>
        <Layout>
            <Header>
                <HeaderNav />
            </Header>
            <Content>
                <Suspense fallback={<Loading />}>
                    <LoginGuard Jsx={<Outlet />} Com={() => <Outlet />} />
                </Suspense>
            </Content>
        </Layout>
    </Layout>
};
export default LayoutCom;