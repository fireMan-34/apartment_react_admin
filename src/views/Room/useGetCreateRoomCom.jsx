import { useState } from 'react';
import { Drawer, Button, } from 'antd';

import SimpleFormCreator from '../../components/SimpleFormCreator';
import { FormItems, FormItemDefaultValues } from './commonFn';

const useGetCreateRoomCom = () => {
    const [IsOpen, setIsOpen] = useState(false);
    const open = e => setIsOpen(v => true);
    const close = e => setIsOpen(v => false);

    return {
        Room_Button: <Button type="dashed" onClick={open}>创建新房间</Button>,
        Room_Drawer: <Drawer title="createRoomInfo" placement='right' visible={IsOpen} onClose={close}>
            <SimpleFormCreator title={"创建新房间"} formItems={FormItems} defaultValues={FormItemDefaultValues} />
        </Drawer>

    }
}
export default useGetCreateRoomCom;