import React, { useReducer, useEffect } from 'react'
import { Button, Popover, Space } from 'antd';

const RESET_FLOORINFO = "REST_FLOORINFO";
const CHANGE_IS_OPEN_INDEX = "CHANGE_IS_OPEN_INDEX";

const initState = (floorInfo) => {
    return floorInfo.map(
        name => ({
            name,
            key: "flooreInfo" + name,
            isOpen: false,
        })
    )
};
const reducer = (state, action) => {
    switch (action.type) {
        case RESET_FLOORINFO:
            return initState(action.payload);
        case CHANGE_IS_OPEN_INDEX:
            return state.map((floorInfo, index) => action.payload === index ? { ...floorInfo, isOpen: !floorInfo.isOpen } : floorInfo);
        default: return state;
    }
};

export default function BuildFloors({ floorInfo = [], buildFloorCounts = 0 }) {
    const [floorInfoArray, dispatachFloorInfo] = useReducer(reducer, initState(floorInfo));
    useEffect(() => {
        dispatachFloorInfo({ type: RESET_FLOORINFO, payload: floorInfo });
    }, [floorInfo]);
    return (
        <>
            一共有：{buildFloorCounts} 层
            <br />
            <Space style={{ display: "flex" }} direction="vertical">
                {floorInfoArray.map(({ name, key }) => (<Popover key={key} content="INFO_SHOW"><Button>{name}</Button></Popover>))}
            </Space>
        </>
    )
}
