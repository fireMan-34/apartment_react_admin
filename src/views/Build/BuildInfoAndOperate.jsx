import React from "react";
import { Card, Row, Col, Button, Statistic, Space } from "antd";
import DelAlertPopconfirm from '../../components/DelAlertPopconfirm';
import BuildFloors from "./BuildFloors";

const curryButton = (text, clickFn) => {
    return <Button type='primary' onClick={clickFn} size="small">{text}</Button>
};
const BuildInfoAndOperate = ({ build = {}, builds, editAndOpenForm, editAndOpenFloorInfoForm, delBuild, isLoading }) => {
    const buildName = build?.name || "楼信息";
    const buildCounts = builds?.length || 0;
    const buildFloorCounts = build.floorInfo?.length || 0;
    const buildFloors = build.floorInfo;

    return (
        <Card
            title={buildName}
            actions={
                [
                    curryButton("增加楼层", editAndOpenFloorInfoForm),
                    curryButton("修改楼栋名", editAndOpenForm),
                    <DelAlertPopconfirm Com={curryButton("删除")} onConfirm={delBuild} />
                ]}
            hoverable>
            <Space direction="vertical" size={"middle"} style={{ display: "flex" }}>
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
                <BuildFloors floorInfo={buildFloors} buildFloorCounts={buildFloorCounts} />
            </Space>
        </Card>
    )
}
export default BuildInfoAndOperate;