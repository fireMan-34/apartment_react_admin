import './index.scss';

import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

import HeaderNav from './HeaderNav';
import SiderNav from './SiderNav';

//通过全局状态数据获取导航信息，而不依赖于页面具体传参

const LayoutCom = () => {
    return <Layout className='layout'>
        <Sider><SiderNav /></Sider>
        <Layout>
            <Header>
                <HeaderNav />
            </Header>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    </Layout>
};
export default LayoutCom;