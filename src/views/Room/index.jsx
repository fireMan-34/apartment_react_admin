import React from 'react'
import './index.scss'

import { Divider } from 'antd';

import ContentLayout from '../../components/ContentLayout';
import useGetCreateRoomCom from './useGetCreateRoomCom';
import useGetControlRoomTable from './useGetControlRoomTable';

const curryDiver = ({ text }) => (<Divider>{text}</Divider>);

export default function Room() {
    const { Room_Button, Room_Drawer } = useGetCreateRoomCom();
    const { Room_Table, Room_Update_Form } = useGetControlRoomTable();
    return (
        <ContentLayout Com={
            <div className='roomContent'>
                {curryDiver({ text: "分割线" })}
                {Room_Button}
                {Room_Drawer}
                {curryDiver({ text: "分割线" })}
                {Room_Table}
                {Room_Update_Form}
            </div>} />
    )
}
