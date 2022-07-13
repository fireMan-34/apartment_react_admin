import React from "react";
import { Card, Row, Col, Button, Statistic } from "antd";
import DelAlertPopconfirm from '../../components/DelAlertPopconfirm';

const curryButton = (text, clickFn) => {
    return <Button type='primary' onClick={clickFn} size="small">{text}</Button>
};
const BuildInfoAndOperate = ({ build = {}, builds, addFloor, editAndOpenForm, delBuild, isLoading }) => {
    const buildName = build?.name || "楼信息";
    const buildCounts = builds?.length || 0;
    const buildFloorCounts = build.floorInfo?.length || 0;

    return (
        <Card
            title={buildName}
            actions={
                [
                    curryButton("增加楼层", addFloor),
                    curryButton("修改楼层名", editAndOpenForm),
                    <DelAlertPopconfirm Com={curryButton("删除")} onConfirm={delBuild} />
                ]}
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
export default BuildInfoAndOperate;