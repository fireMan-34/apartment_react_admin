import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button, Space, Table, Drawer, } from 'antd';

import './index.scss'
import ContentLayout from '../../components/ContentLayout';
import SimpleFormCreator from '../../components/SimpleFormCreator';
import { useFormMode, FORM_OPEN_MODE } from '../../hook/useFormMode';
import { commonRequest } from '../../util/request';
import { getAllRoom } from '../../api/room';
import { getAllBuild } from '../../api/build';
import { getAllType } from '../../api/roomType';
import { colums, roomItems } from './commonFn';

Array.prototype.checkReturnArrayOrFalse = function (checkFn = arr => (arr || false)) {
    return checkFn(this) ? this : false;
};
Array.prototype.arrayWithEffect = function (effectFn = arr => arr) {
    effectFn(this);
    return this;
};
export default function RoomList() {
    const [isLoading, setIsLoading] = useState(false);
    const [firstLoading, setFirstLoading] = useState(false);
    const columnsMemo = useMemo(() => colums, []);
    const [roomData, setRoomData] = useState([]);
    const [roomDataMapKey, setRoomDataMapKey] = useState([]);
    const [builds, setBuilds] = useState([]);
    const [types, setTypes] = useState([])
    useEffect(() => {
        setRoomDataMapKey(roomData.map(room => ({ ...room, key: room._id })))
    }, [roomData]);
    const getAllRoomWithEffect = useCallback(async () => {
        const ret = await commonRequest({ isLoading, setIsLoading },
            { request: getAllRoom, });
        if (!ret) return Promise.reject({ tryFn: getAllRoomWithEffect });
        const { data } = ret;
        setRoomData(data);
        return Promise.resolve(data);
    }, []);
    const getBuildsWithEffect = useCallback(async () => {
        const ret = await commonRequest({ isLoading, setIsLoading },
            { request: getAllBuild });
        if (!ret) return Promise.reject({ tryFn: getAllRoomWithEffect });
        const { data } = ret;
        setBuilds(data);
        return Promise.resolve(data);
    }, []);
    const getTypesWithEffect = useCallback(async () => {
        const ret = await commonRequest({ isLoading, setIsLoading },
            { request: getAllType });
        if (!ret) return Promise.reject({ tryFn: getAllRoomWithEffect });
        const { data } = ret;
        setBuilds(data);
        return Promise.resolve(data);
    }, [])
    useEffect(() => {
        const asyncWork = [getAllRoomWithEffect, getBuildsWithEffect, getTypesWithEffect];
        const FirstLoadingWithEffect = async (asyncWork = [], tryCount = 0, onSuccess) => {
            console.log(asyncWork);
            return (await (
                Promise.allSettled(asyncWork.map(asyncFn => asyncFn())))
            )
                .arrayWithEffect(arr => arr.every(result => result.status === "fulfiled") && onSuccess())
                .filter(result => result.status !== "fulfilled")
                .map(reject => reject.reason?.tryFn)
                // .filter(v => !v)
                .checkReturnArrayOrFalse(arr => arr.length > 0)
                ?.arrayWithEffect?.(asyncWork => tryCount > 0 ? FirstLoadingWithEffect(asyncWork, tryCount--, onSuccess) : null);

        };
        FirstLoadingWithEffect(asyncWork, 1, () => setFirstLoading(true));
    }, []);

    const { closeForm, addAndOpenForm, editAndOpenForm, formRef } = useFormMode();

    return (
        <ContentLayout Com={<div>
            <Space style={{ display: "flex" }} direction={"vertical"} size="large">
                <Button>添加房间</Button>
                <Table columns={columnsMemo} dataSource={roomDataMapKey} />
            </Space>
            {/* <Drawer visible={formRef.isOpen}> */}
            <SimpleFormCreator formItems={roomItems} />
            <SimpleFormCreator formItems={[]} finishFn={console.log} />
            {/* </Drawer> */}
        </div>} />
    )
}
