import React, { useState } from 'react'
import ContentLayout from '../../components/ContentLayout';
import DelAlertPopconfirm from '../../components/DelAlertPopconfirm';
import { Button, Card } from 'antd';

const curryButton = (text, clickFn) => {
    return <Button type='primary' onClick={clickFn} size="small">{text}</Button>
}
const ShowBuildNumberTextNode = ({ buildCounts }) => {
    return <p>一共有{buildCounts || 0}栋楼</p>;
}
const BuildInfoAndOperate = ({ buildName, editeBuild, delBuild }) => {
    return (
        <Card
            title={buildName}
            actions={[curryButton("修改", editeBuild), <DelAlertPopconfirm Com={curryButton("删除")} onConfirm={delBuild} />]}
            hoverable>

        </Card>
    )
}

export default function Build() {
    const [builds, setBuilds] = useState(null);
    const [showBuildIndex, setShowBuildIndex] = useState(0);

    return (
        <ContentLayout Com={<div>
            <ShowBuildNumberTextNode builds={builds?.length} />
            <BuildInfoAndOperate buildName={"一层楼"} />
        </div>} />
    )
}
