import React from 'react'
import { Menu, Avatar } from 'antd';

// import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';

const getTransformMenu = (menu) => menu?.map(({ name, url, children }) => ({
    label: name,
    key: name + url,
    url,
    children: getTransformMenu(children)
}));

export default function HeaderNav() {
    const menu = useSelector(state => state.common.menu);
    const curMenu = useSelector(state => state.common.menu);
    const admin = useSelector(state => state.admin.adminInfo);

    const dispatch = useDispatch();

    const items = getTransformMenu(menu);

    return (
        <div className='headerNav'>
            <Avatar size="large">
                {admin?.name || 'unLogin'.slice(0, 2)}
            </Avatar>
            <Menu items={items} mode="horizontal" theme='dark' />
        </div>
    )
}
