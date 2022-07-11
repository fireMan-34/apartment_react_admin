import './index.scss';

import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

import HeaderNav from './HeaderNav';
import SiderNav from './SiderNav';
import { Suspense } from 'react';

//通过全局状态数据获取导航信息，而不依赖于页面具体传参

const FailBackUI = () => (<>
    <h2>
        Loading...
    </h2>
</>)

const LayoutCom = () => {
    return <Layout className='layout'>
        <Sider><SiderNav /></Sider>
        <Layout>
            <Header>
                <HeaderNav />
            </Header>
            <Content>
                <Suspense fallback={FailBackUI}>
                    <Outlet />
                </Suspense>
            </Content>
        </Layout>
    </Layout>
};
export default LayoutCom;