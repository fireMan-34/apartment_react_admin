import { useState, useCallback } from 'react';
import { Drawer, Button, message } from 'antd';

import SimpleFormCreator from '../../components/SimpleFormCreator';
import { FormItems, FormItemDefaultValues } from './commonFn';
import { addType } from '../../api/roomType';

const useGetCreateRoomCom = ({ setIsLoading, Renew_Data }) => {
    const [IsOpen, setIsOpen] = useState(false);
    const open = e => setIsOpen(v => true);
    const close = e => setIsOpen(v => false);
    const onFinish = useCallback(async data => {
        setIsLoading(true);
        const { success, info } = await addType(data);
        setIsLoading(false);
        message.info(info);
        if (!success) {
            return
        }
        else {
            setIsOpen(false);
            await Renew_Data();
        }
    });

    return {
        Room_Button: <Button type="dashed" onClick={open}>创建新房间</Button>,
        Room_Drawer: <Drawer title="createRoomInfo" placement='right' visible={IsOpen} onClose={close}>
            <SimpleFormCreator title={"创建新房间"} formItems={FormItems} defaultValues={FormItemDefaultValues} finishFn={onFinish} />
        </Drawer>,

    }
}
export default useGetCreateRoomCom;