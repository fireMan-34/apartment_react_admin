import { Layout, } from 'antd';
const { Header, Content, Sider } = Layout;
const LoginLayout = ({ Content }) => {
    return <Layout>
        <Layout>
            <Header>Login</Header>
            <Content>{Content}</Content>
        </Layout>
    </Layout>
};
export default LoginLayout;