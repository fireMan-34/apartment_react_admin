import React from 'react'

import ContentLayout from '../../components/ContentLayout';
import useGetCreateRoomCom from './useGetCreateRoomCom';


export default function Room() {
    const { Room_Button, Room_Drawer } = useGetCreateRoomCom();

    return (
        <ContentLayout Com={<div className='roomContent'>
            {Room_Button}
            {Room_Drawer}
        </div>} />
    )
}
