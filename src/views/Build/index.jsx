import React, { useEffect, useState, useCallback, useRef } from 'react'
import { message, } from 'antd';

import './index.scss';
import ContentLayout from '../../components/ContentLayout';
import ShowBuildNameAndClickNode from './ShowBuildNameAndClickNode';
import BuildInfoAndOperate from './BuildInfoAndOperate';
import BuildModel from './BuildModel';

import { useFormMode, FORM_OPEN_MODE } from '../../hook/useFormMode';
import { getAllBuild, addBuild, editBuild } from '../../api/build';
import { addBuildNameFormItems, editFloorInfoNameItems, editBuildNameFormItems } from './commonFn';

const FORM_TYPE = {
    BUILD_NAME: "BUILD_NAME",
    BUILD_FLOOR_INFO: "BUILD_FLOOR_INFO",
}

export default function Build() {
    const [isLoading, setIsLoading] = useState(false);
    const { formState, closeForm, addAndOpenForm, editAndOpenForm } = useFormMode();

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
    })

    useEffect(() => {
        getBuilds();
    }, []);

    const getDefaultValues = useCallback(() => {
        if (!formState.isOpen) return {};
        if (formState.editMode === "ADD") return {};
        if (formState.editMode === "EDIT" && formState.formType === FORM_TYPE.BUILD_NAME) return { ...builds[showBuildIndex] };
        if (formState.editMode === "EDIT" && formState.formType === FORM_TYPE.BUILD_FLOOR_INFO) return { ...builds[showBuildIndex] };
    }, [formState, builds, showBuildIndex]);
    const getFormItems = useCallback(() => {
        if (!formState.isOpen) return [];
        if (formState.editMode === "ADD") return addBuildNameFormItems;
        if (formState.editMode === "EDIT" && formState.formType === FORM_TYPE.BUILD_NAME) return editBuildNameFormItems;
        if (formState.editMode === "EDIT" && formState.formType === FORM_TYPE.BUILD_FLOOR_INFO) return editFloorInfoNameItems;
    }, [formState]);
    const addBulidName = useCallback(async (form) => {
        console.log(form);
    }, []);
    const editBuildName = useCallback(() => {

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
                isOpen={formState.isOpen}
                onCancel={closeForm}
                formItems={getFormItems()}
                defaultValues={getDefaultValues()}
                submitFn={sendAddBuild}
            />
        </div>} />
    )
}
