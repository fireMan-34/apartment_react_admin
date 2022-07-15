import React, { useMemo, useCallback, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginShow from './LoginShow';
import { loginAdmin } from '../../api/admin';
import { setAdminInfo } from '../../store/adminSlice';

function LoginContent({ dispatch }) {
    const [isLoading, setIsLoading] = useState(false);
    const naviage = useNavigate();
    const location = useLocation();
    const onFinsh = useCallback(async (formData) => {
        if (isLoading) {
            message.info("正在上传中")
            return
        }
        setIsLoading(true);
        const { info, success, data } = await loginAdmin(formData);
        message.info(info);
        setIsLoading(false);
        if (!success) return;
        setAdminInfo(data);
        dispatch(setAdminInfo(data));
        setTimeout(() => {
            naviage(location.state.from)
        }, 200);
    }, [isLoading]);
    return (
        <div className='loginContent'>
            <div className="center">
                {useMemo(() => <LoginShow />, [])}
                <Form className='center' wrapperCol={{ span: 24 }} labelCol={{ span: 4 }} onFinish={onFinsh}>
                    <Form.Item label="账号" name={"name"} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码" name={"pwd"} rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="ghost" htmlType='submit'>提交</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default connect(null,)(LoginContent);