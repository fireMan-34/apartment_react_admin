import React, { useState } from 'react'
import './index.scss'

import { Divider } from 'antd';

import ContentLayout from '../../components/ContentLayout';
import useGetCreateRoomCom from './useGetCreateRoomCom';
import useGetControlRoomTable from './useGetControlRoomTable';

const curryDiver = ({ text }) => (<Divider>{text}</Divider>);

export default function Room() {
    const [isLoading, setIsLoading] = useState(false);
    const { Room_Table, Room_Update_Form, Renew_Data, Room_Table_Down } = useGetControlRoomTable({ isLoading, setIsLoading });
    const { Room_Button, Room_Drawer } = useGetCreateRoomCom({ isLoading, setIsLoading, Renew_Data });
    return (
        <ContentLayout Com={
            <div className='roomContent'>
                {curryDiver({ text: "分割线" })}
                {Room_Table_Down}
                {curryDiver({ text: "分割线" })}
                {Room_Button}
                {Room_Drawer}
                {curryDiver({ text: "分割线" })}
                {Room_Table}
                {Room_Update_Form}
            </div>} />
    )
}
