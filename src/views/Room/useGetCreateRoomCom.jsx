import { useState } from 'react';
import { Drawer, Button, Form, Input } from 'antd';

const layoutCol = {
    span: 8
};
const wrappelCol = {
    span: 16
}

const useGetCreateRoomCom = () => {
    const [IsOpen, setIsOpen] = useState(false);
    const open = e => setIsOpen(v => true);
    const close = e => setIsOpen(v => false);
    const [form] = Form.useForm();

    return {
        Room_Button: <Button type="dashed" onClick={open}>创建新房间</Button>,
        Room_Drawer: <Drawer title="createRoomInfo" placement='right' visible={IsOpen} onClose={close}>
            <Form form={form} layout={layoutCol} wrapperCol={wrappelCol}>
                <h2>创建新房间</h2>
                <hr />
                <Form.Item name={"suiji"} label="随机" rules={[{ require: true }]} >
                    <Input />
                </Form.Item>
            </Form>
        </Drawer>

    }
}
export default useGetCreateRoomCom;