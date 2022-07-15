import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button, Space, Table, Drawer, Skeleton } from 'antd';

import './index.scss'
import ContentLayout from '../../components/ContentLayout';
import SimpleFormCreator from '../../components/SimpleFormCreator';
import { useFormMode, FORM_OPEN_MODE } from '../../hook/useFormMode';
import { commonRequest } from '../../util/request';
import { getAllRoom, editRoom, delRoom } from '../../api/room';
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
const FORM_TYPE = {
    ROOM: "ROOM"
}
export default function RoomList() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasfirstLoading, setHasFirstLoading] = useState(false);
    const [roomData, setRoomData] = useState([]);
    const [roomDataMapKey, setRoomDataMapKey] = useState([]);
    useEffect(() => {
        setRoomDataMapKey(roomData.map(room => ({ ...room, key: room._id })))
    }, [roomData]);
    const [builds, setBuilds] = useState([]);
    const [types, setTypes] = useState([])
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
        const builds = data.map(item => ({
            label: item.name,
            value: item._id,
            children: item.floorInfo.map(it => ({ label: it, value: it }))
        }));
        setBuilds(builds);
        return Promise.resolve(data);
    }, []);
    const getTypesWithEffect = useCallback(async () => {
        const ret = await commonRequest({ isLoading, setIsLoading },
            { request: getAllType });
        if (!ret) return Promise.reject({ tryFn: getAllRoomWithEffect });
        const { data } = ret;
        const types = data.map(item => ({ label: item.name, value: item._id }));
        setTypes(types);
        return Promise.resolve(data);
    }, [])
    useEffect(() => {
        const asyncWork = [getAllRoomWithEffect, getBuildsWithEffect, getTypesWithEffect];
        const FirstLoadingWithEffect = async (asyncWork = [], tryCount = 0, onSuccess) => {
            return (await (
                Promise.allSettled(asyncWork.map(asyncFn => asyncFn())))
            )
                .arrayWithEffect(arr => arr.every(result => result.status === "fulfilled") && onSuccess())
                .filter(result => result.status !== "fulfilled")
                .map(reject => reject.reason?.tryFn)
                // .filter(v => !v)
                .checkReturnArrayOrFalse(arr => arr.length > 0)
                ?.arrayWithEffect?.(asyncWork => tryCount > 0 ? FirstLoadingWithEffect(asyncWork, tryCount--, onSuccess) : null);

        };
        FirstLoadingWithEffect(asyncWork, 1, () => setHasFirstLoading(true));
    }, []);


    const { closeForm, addAndOpenForm, editAndOpenForm, formRef } = useFormMode(
        (formState, actions) => {
            const { isOpen, editMode, formType } = formState;
            const { closeForm, addAndOpenForm, editAndOpenForm } = actions;
            if (isOpen === false) return {
                initialValues: {},
                formItems: [],
                finishFn: () => []
            };
            if (editMode === FORM_OPEN_MODE.ADD) return {
                initialValues: {},
                formItems: roomItems.map(roomItem => {
                    const { label } = roomItem;
                    switch (label) {
                        case "所在楼栋楼层":
                            return { ...roomItem, args: { ...roomItem.args, options: builds } };
                        case "选择房型":
                            return { ...roomItem, args: { ...roomItem.args, options: types } };
                        default: return roomItem;
                    }
                }),
                finishFn: () => { }
            };
            if (editMode === FORM_OPEN_MODE.EDITE) return {
                initialValues: {},
                formItems: roomItems.map(roomItem => {
                    const { label } = roomItem;
                    switch (label) {
                        case "所在楼栋楼层":
                            return { ...roomItem, args: { ...roomItem.args, options: builds } };
                        case "选择房型":
                            return { ...roomItem, args: { ...roomItem.args, options: types } };
                        default: return roomItem;
                    }
                }),
                finishFn: () => { }
            }
        }
    );
    const openRoomFormClick = useCallback(() => addAndOpenForm(FORM_TYPE.ROOM), []);
    const editRoomItemClick = useCallback(() => editAndOpenForm(FORM_TYPE.ROOM), [roomData,]);
    const deleRoomItemClick = useCallback(async (roomid) => {
        console.log(roomid);
        const ret = await commonRequest({ isLoading, setIsLoading }, { data: { roomid }, request: delRoom });
        // if (!ret) return;
        // await getAllRoomWithEffect();
    }, [roomData, isLoading,]);
    const columnsMemo = useMemo(() => colums(deleRoomItemClick, editRoomItemClick,), []);
    return (
        <ContentLayout Com={<div>
            <Space style={{ display: "flex" }} direction={"vertical"} size="large">
                <Button onClick={openRoomFormClick}>添加房间</Button>
                <Table columns={columnsMemo} dataSource={roomDataMapKey} />
            </Space>
            <Drawer visible={formRef.isOpen} onClose={() => closeForm()}>
                {hasfirstLoading ? <SimpleFormCreator initialValues={formRef.initialValues} formItems={formRef.formItems} finishFn={formRef.finishFn} /> : <Skeleton active />}
            </Drawer>
        </div>} />
    )
}
