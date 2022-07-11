import React from 'react'
import { Menu, Avatar } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { setCurMenu } from '../../store/commonSlice';

const getTransformMenu = (menu) => menu?.map(({ name, url, children }) => ({
    label: name,
    key: name,
    url: url || '',
    // children: getTransformMenu(children)
}));

export default function HeaderNav() {
    const menu = useSelector(state => state.common.menu);
    const curMenu = useSelector(state => state.common.curMenu);
    const admin = useSelector(state => state.admin.adminInfo);

    const dispatch = useDispatch();

    const items = getTransformMenu(menu);

    const clickItems = ({ key }) => dispatch(setCurMenu({ curMenu: key }));

    console.log(curMenu || 'null');

    return (
        <div className='headerNav'>
            <Avatar size="large">
                {admin?.name || 'unLogin'.slice(0, 2)}
            </Avatar>
            <Menu items={items} mode="horizontal" theme='dark' onClick={clickItems} />
        </div>
    )
}
