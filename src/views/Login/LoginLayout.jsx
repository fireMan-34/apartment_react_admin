import { Layout, Divider } from 'antd';

const LoginLayout = ({ Content }) => {
    return <Layout className='loginLayout'>
        <Layout>
            <Layout.Header>Login</Layout.Header>
            <Layout.Content>
                <Content />
            </Layout.Content>
            <Layout.Footer>
                <Divider />
                <footer>网页页脚部分</footer>
            </Layout.Footer>
        </Layout>
        <Layout.Sider>
            内容
        </Layout.Sider>
    </Layout>
};
export default LoginLayout;