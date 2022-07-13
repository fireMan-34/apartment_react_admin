import React, { useEffect, useState } from 'react'
import { Button, Card, Statistic, Row, Col, message } from 'antd';

import './index.scss';
import ContentLayout from '../../components/ContentLayout';
import DelAlertPopconfirm from '../../components/DelAlertPopconfirm';
import { getAllBuild } from '../../api/build';

const curryButton = (text, clickFn) => {
    return <Button type='primary' onClick={clickFn} size="small">{text}</Button>
};

const ShowBuildNameAndClickNode = ({ builds = [], addBulid, clickIndex }) => {
    return <>
        {builds.map(build => <Button key={build._id} onClick={e => clickIndex(build._id)}>{build.name}</Button>)}<Button onClick={addBulid} >添加楼栋</Button>
    </>
}

const BuildInfoAndOperate = ({ build = {}, builds, addFloor, editeBuild, delBuild, isLoading }) => {
    const buildName = build?.name || "楼信息";
    const buildCounts = builds?.length || 0;
    const buildFloorCounts = build.floorInfo?.length || 0;
    return (
        <Card
            title={buildName}
            actions={[curryButton("增加楼层", addFloor), curryButton("修改楼层名", editeBuild), <DelAlertPopconfirm Com={curryButton("删除")} onConfirm={delBuild} />]}
            hoverable>
            <Row gutter={8}>
                <Col span={4}>
                    <Statistic title={"楼栋数目"} value={buildCounts} loading={isLoading} suffix="栋" />
                </Col>
                <Col span={4}>
                    <Statistic title={"楼层数目"} value={buildFloorCounts} />
                </Col>
                <Col span={4}>
                    <Statistic title={"房间数目"} value={buildFloorCounts} />
                </Col>
            </Row>
        </Card>
    )
}

export default function Build() {
    const [isLoading, setIsLoading] = useState(false);
    const [builds, setBuilds] = useState([]);
    const [showBuildIndex, setShowBuildIndex] = useState(0);
    const clickIndexFn = (id) => {
        const clickIndex = builds.findIndex(({ _id }) => _id === id);
        setShowBuildIndex(clickIndex);
    };

    const getBuilds = async () => {
        setIsLoading(true);
        const { count, data, info, success } = await getAllBuild();
        setIsLoading(false);
        message.info(info);
        if (!success) {
            return;
        }
        setBuilds(data);
    }
    useEffect(() => {
        getBuilds();
    }, []);

    return (
        <ContentLayout Com={<div>
            <hr className='hrMargin' />
            <ShowBuildNameAndClickNode builds={builds} clickIndex={clickIndexFn} />
            <hr className='hrMargin' />
            <BuildInfoAndOperate build={builds?.[showBuildIndex]} builds={builds} isLoading={isLoading} />
        </div>} />
    )
}
