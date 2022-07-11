import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import './index.scss';

const { Header, Sider, Content } = Layout;

//通过全局状态数据获取导航信息，而不依赖于页面具体传参

const LayoutCom = () => {
    return <Layout className='layout'>
        <Sider>Sider</Sider>
        <Layout>
            <Header>
                Header
            </Header>
            <Content>
                Content
            </Content>
        </Layout>
    </Layout>
};
export default LayoutCom;