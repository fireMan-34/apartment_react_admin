import React from 'react';
import { Popconfirm } from 'antd';

const alertInfo = "请问是否要执行删除，这是不可逆操作，请谨慎执行。";
const okText = "确定";
const cancelText = "取消";
export default function DelAlertPopconfirm({ Com, onConfirm }) {
    return (
        <Popconfirm title={alertInfo} okText={okText} cancelText={cancelText} onConfirm={onConfirm}>
            {Com}
        </Popconfirm>
    )
}
