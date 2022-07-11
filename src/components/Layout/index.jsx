import './index.scss';

import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

import HeaderNav from './HeaderNav';

//通过全局状态数据获取导航信息，而不依赖于页面具体传参

const LayoutCom = () => {
    return <Layout className='layout'>
        <Sider>Sider</Sider>
        <Layout>
            <Header>
                <HeaderNav />
            </Header>
            <Content>
                Content
            </Content>
        </Layout>
    </Layout>
};
export default LayoutCom;