import React from 'react'
import { Menu, Avatar } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { setCurMenu } from '../../store/commonSlice';

import { getTransformMenu } from './commonFn';

export default function HeaderNav() {
    const menu = useSelector(state => state.common.menu);
    const curMenu = useSelector(state => state.common.curMenu);
    const admin = useSelector(state => state.admin.adminInfo);

    const dispatch = useDispatch();

    const items = getTransformMenu(menu);

    const clickItems = ({ key }) => dispatch(setCurMenu({ curMenu: key }));

    return (
        <div className='headerNav'>
            <Avatar size="large">
                {admin?.name || 'unLogin'.slice(0, 2)}
            </Avatar>
            <Menu items={items} mode="horizontal" theme='dark' onClick={clickItems} />
        </div>
    )
}
