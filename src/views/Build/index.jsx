import React, { useEffect, useState, useCallback } from 'react'
import { message, } from 'antd';
import pick from 'lodash/pick';

import './index.scss';
import ContentLayout from '../../components/ContentLayout';
import ShowBuildNameAndClickNode from './ShowBuildNameAndClickNode';
import BuildInfoAndOperate from './BuildInfoAndOperate';
import BuildModel from './BuildModel';

import { useFormMode, FORM_OPEN_MODE } from '../../hook/useFormMode';
import { getAllBuild, addBuild, editBuild } from '../../api/build';
import { commonRequest } from '../../util/request';
import { buildNameFormItems, floorInfoNameItems } from './commonFn';
import cloneDeep from 'lodash/cloneDeep';

const FORM_TYPE = {
    BUILD_NAME: "BUILD_NAME",
    BUILD_FLOOR_INFO: "BUILD_FLOOR_INFO",
}

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
        const wantBuildData = pick({ ...beforeBuildData, ...formData, buildid: beforeBuildData._id }, ["buildid", "name", "floorInfo", "__v"]);
        const ret = await commonRequest({ isLoading, setIsLoading }, { data: wantBuildData });
        if (!ret) return;
        await getBuilds();
        closeForm();
    }, [builds, showBuildIndex, isLoading]);

    const sendEditFloor = useCallback(async (form, closeForm) => {
        const formData = form.getFieldsValue();
        const beforeBuildData = builds[showBuildIndex];
        const wantBuildData = pick({ ...beforeBuildData, buildid: beforeBuildData._id, floorInfo: [...beforeBuildData.floorInfo, formData.floorName] });
        const ret = await commonRequest({ isLoading, setIsLoading }, { data: wantBuildData });
        if (!ret) return;
        await getBuilds();
        closeForm();

    }, [builds, showBuildIndex, isLoading]);

    const { closeForm, addAndOpenForm, editAndOpenForm, formRef } = useFormMode(
        (formState, actions) => {
            const { isOpen, editMode, formType } = formState;
            const { closeForm, addAndOpenForm, editAndOpenForm } = actions;
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
                        submitFn: sendEditBuild
                    }
                }
                if (formType === FORM_TYPE.BUILD_FLOOR_INFO) {
                    return {
                        initialValues: {},
                        formItems: floorInfoNameItems,
                        submitFn: () => {
                            console.log(`hello`);
                        }
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
