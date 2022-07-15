import React, { useEffect, useState, useCallback } from 'react'
import pick from 'lodash/pick';

import './index.scss';
import ContentLayout from '../../components/ContentLayout';
import ShowBuildNameAndClickNode from './ShowBuildNameAndClickNode';
import BuildInfoAndOperate from './BuildInfoAndOperate';
import BuildModel from './BuildModel';

import { useFormMode, FORM_OPEN_MODE } from '../../hook/useFormMode';
import { getAllBuild, addBuild, editBuild, delBuild } from '../../api/build';
import { commonRequest } from '../../util/request';
import { buildNameFormItems, floorInfoNameItems } from './commonFn';

const FORM_TYPE = {
    BUILD_NAME: "BUILD_NAME",
    BUILD_FLOOR_INFO: "BUILD_FLOOR_INFO",
}
const allowKeys = ["buildid", "name", "floorInfo", "__v"];

export default function Build() {
    const [isLoading, setIsLoading] = useState(false);
    const [builds, setBuilds] = useState([]);

    const [showBuildIndex, setShowBuildIndex] = useState(0);
    const clickIndexFn = useCallback((id) => {
        const clickIndex = builds.findIndex(({ _id }) => _id === id);
        setShowBuildIndex(clickIndex);
    }, [builds]);

    const getBuilds = useCallback(async () => {
        const { data } = await commonRequest({ isLoading, setIsLoading }, {
            request: getAllBuild,
            dataTransform: () => { },
        });
        setBuilds(data);
    }, [isLoading]);
    const sendAddBuild = useCallback(async (form, closeForm) => {
        const data = form.getFieldsValue();
        const ret = await commonRequest(
            { isLoading, setIsLoading },
            {
                request: addBuild,
                data,
            });
        if (!ret) return;
        await getBuilds();
        closeForm();
    }, [isLoading,]);
    const sendEditBuild = useCallback(async (form, closeForm) => {
        const formData = form.getFieldsValue();
        const beforeBuildData = builds[showBuildIndex];
        const wantBuildData = pick({ ...beforeBuildData, ...formData, buildid: beforeBuildData._id }, allowKeys);
        const ret = await commonRequest({ isLoading, setIsLoading }, { data: wantBuildData, request: editBuild });
        if (!ret) return;
        await getBuilds();
        closeForm();
    }, [builds, showBuildIndex, isLoading]);
    const sendDeleteBuild = useCallback(async (buildid) => {
        const ret = await commonRequest({ isLoading, setIsLoading }, { data: { buildid }, request: delBuild });
        if (!ret) return;
        await getBuilds();
    }, [isLoading]);

    const sendEditFloor = useCallback(async (form, closeForm) => {
        const formData = form.getFieldsValue();
        const beforeBuildData = builds[showBuildIndex];
        const wantBuildData = pick({ ...beforeBuildData, buildid: beforeBuildData._id, floorInfo: [...beforeBuildData.floorInfo, formData.floorName] }, allowKeys);
        const ret = await commonRequest({ isLoading, setIsLoading }, { data: wantBuildData, request: editBuild });
        if (!ret) return;
        await getBuilds();
        closeForm();

    }, [builds, showBuildIndex, isLoading]);

    const { closeForm, addAndOpenForm, editAndOpenForm, formRef } = useFormMode(
        (formState, actions) => {
            const { isOpen, editMode, formType } = formState;
            const { closeForm, } = actions;
            if (isOpen === false) {
                return {
                    initialValues: {},
                    formItems: {},
                    submitFn: () => {
                    }
                }
            }
            if (editMode === FORM_OPEN_MODE.ADD) {
                if (formType === FORM_TYPE.BUILD_NAME) {
                    return {
                        initialValues: {},
                        formItems: buildNameFormItems,
                        submitFn: (...args) => sendAddBuild(...args, closeForm),
                    }
                }
            }
            if (editMode === FORM_OPEN_MODE.EDITE) {
                if (formType === FORM_TYPE.BUILD_NAME) {
                    return {
                        initialValues: builds[showBuildIndex],
                        formItems: buildNameFormItems,
                        submitFn: (...args) => sendEditBuild(...args, closeForm)
                    }
                }
                if (formType === FORM_TYPE.BUILD_FLOOR_INFO) {
                    return {
                        initialValues: {},
                        formItems: floorInfoNameItems,
                        submitFn: (...args) => sendEditFloor(...args, closeForm)
                    }
                }
            }
            throw new Error("form State is no support");

        }
    );



    useEffect(() => {
        getBuilds();
    }, []);

    return (
        <ContentLayout Com={<div>
            <hr className='hrMargin' />
            <ShowBuildNameAndClickNode
                builds={builds}
                clickIndex={clickIndexFn}
                addAndOpenForm={() => addAndOpenForm(FORM_TYPE.BUILD_NAME)} />
            <hr className='hrMargin' />
            <BuildInfoAndOperate
                build={builds?.[showBuildIndex]}
                builds={builds}
                isLoading={isLoading}
                editAndOpenForm={() => editAndOpenForm(FORM_TYPE.BUILD_NAME)}
                editAndOpenFloorInfoForm={() => editAndOpenForm(FORM_TYPE.BUILD_FLOOR_INFO)}
                delBuild={sendDeleteBuild}
            />
            <BuildModel
                title={"noname"}
                isOpen={formRef.isOpen}
                onCancel={closeForm}
                formItems={formRef.formItems}
                initialValues={formRef.initialValues}
                submitFn={formRef.submitFn}
            />
        </div>} />
    )
}
