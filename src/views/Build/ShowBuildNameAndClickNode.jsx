import React from 'react';
import { Button } from 'antd';

export default function ShowBuildNameAndClickNode({ builds = [], addAndOpenForm, clickIndex }) {
    return <>
        <Button onClick={addAndOpenForm} >添加楼栋</Button>
        <br />
        {builds.map(build => <Button key={build._id} onClick={e => clickIndex(build._id)}>{build.name}</Button>)}

    </>
}
