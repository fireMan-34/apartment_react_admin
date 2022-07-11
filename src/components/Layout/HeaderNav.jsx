import React, { useCallback } from 'react'
import { Menu, Avatar } from 'antd';

import { useSelector, useDispatch, } from 'react-redux';
import { setCurMenu } from '../../store/commonSlice';

import { useNavigate, useLocation } from 'react-router-dom';

import { getTransformMenu } from './commonFn';


export default function HeaderNav() {
    const menu = useSelector(state => state.common.menu);
    const curMenu = useSelector(state => state.common.curMenu);
    const admin = useSelector(state => state.admin.adminInfo);
    const naviagte = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const items = getTransformMenu(menu);

    console.log(menu);

    const clickItems = useCallback(({ key }) => {
        dispatch(setCurMenu(key));

        const urlOrNull = menu.find(menuItem => menuItem.name === key).url || null;

        urlOrNull && urlOrNull !== location.pathname && naviagte(urlOrNull);
    }, [menu, curMenu, admin, location]);

    return (
        <div className='headerNav'>
            <Avatar size="large">
                {admin?.name || 'unLogin'.slice(0, 2)}
            </Avatar>
            <Menu items={items} mode="horizontal" theme='dark' onClick={clickItems} />
        </div>
    )
}
