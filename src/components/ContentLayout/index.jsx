import React from 'react'
import './index.scss'
import { PageHeader } from 'antd';

import { useSelector } from 'react-redux';
import { useLocation, } from 'react-router-dom';

import { transformMenuFlat } from './commonFn';

export default function ContentLayout() {
    const menu = useSelector(state => state.common.menu);
    const { pathname } = useLocation();

    const flatMenu = transformMenuFlat(menu);

    const UrlName = flatMenu.find(item => item.url === pathname).name;

    return (
        <div className='contentLayout'>
            <div className="content">
                <PageHeader title={UrlName || "title"} />
            </div>
        </div>
    )
}
