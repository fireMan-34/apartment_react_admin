import React from 'react';

import { Menu, } from 'antd';

import { useSelector, } from 'react-redux';

import { useNavigate } from "react-router-dom"

import { getTransformMenu } from './commonFn';

export default function SiderNav() {
    const commonMenu = useSelector(state => state.common);
    const navigate = useNavigate();

    const subMenu = commonMenu.menu.find(({ name }) => name === commonMenu.curMenu.curMenu)?.children || [];

    const items = getTransformMenu(subMenu);
    const onClick = ({ key }) => {
        const { url } = subMenu.find(subMenuItem => subMenuItem.name === key);
        navigate(url);
    }

    return (
        <div className='siderNav'>
            <h2>HFireMan</h2>
            <Menu items={items} theme="dark" onClick={onClick} />
        </div>
    )
}
