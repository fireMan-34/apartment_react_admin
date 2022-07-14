import React, { useEffect, useState, useCallback, useRef } from 'react'
import { message, } from 'antd';
import pick from 'lodash/pick';

import './index.scss';
import ContentLayout from '../../components/ContentLayout';
import ShowBuildNameAndClickNode from './ShowBuildNameAndClickNode';
import BuildInfoAndOperate from './BuildInfoAndOperate';
import BuildModel from './BuildModel';

import { useFormMode, FORM_OPEN_MODE } from '../../hook/useFormMode';
import { getAllBuild, addBuild, editBuild } from '../../api/build';
import { buildNameFormItems, floorInfoNameItems } from './commonFn';

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
        setIsLoading(true);
        const { count, data, info, success } = await getAllBuild();
        setIsLoading(false);
        message.info(info);
        if (!success) {
            return;
        }
        setBuilds(data);
    }, []);
    const sendAddBuild = useCallback(async (form) => {
        const data = form.getFieldsValue();
        setIsLoading(true);
        const { success, info } = await addBuild(data);
        message.info(info);
        setIsLoading(false);
        if (!success) return;
        await getBuilds();
        closeForm();
    }, []);
    const sendEditBuild = useCallback(async (form) => {
        const formData = form.getFieldsValue();
        const beforeBuildData = builds[showBuildIndex];
        const wantBuildData = pick({ ...beforeBuildData, ...formData, buildid: beforeBuildData._id }, ["buildid", "name", "floorInfo", "__v"]);
        console.log(wantBuildData);
        await editBuild(wantBuildData);
    }, [builds, showBuildIndex]);

    const sendEditFloor = useCallback(async (form) => {

    }, [builds, showBuildIndex]);

    const { closeForm, addAndOpenForm, editAndOpenForm, formRef } = useFormMode(
        formState => {
            const { isOpen, editMode, formType } = formState;
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
                        submitFn: sendAddBuild,
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

    useEffect(() => {
        console.log(formRef);
    }, [formRef]);

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
