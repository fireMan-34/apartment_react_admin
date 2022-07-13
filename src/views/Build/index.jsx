import React, { useEffect, useState, useCallback, } from 'react'
import { message, } from 'antd';

import './index.scss';
import ContentLayout from '../../components/ContentLayout';
import ShowBuildNameAndClickNode from './ShowBuildNameAndClickNode';
import BuildInfoAndOperate from './BuildInfoAndOperate';
import BuildModel from './BuildModel';

import { useFormMode, FORM_OPEN_MODE } from '../../hook/useFormMode';
import { getAllBuild, addBuild, editBuild } from '../../api/build';
import { addBuildNameFormItems, addFloorInfoNameItems, editBuildNameFormItems } from './commonFn';


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
    useEffect(() => {
        getBuilds();
    }, []);

    const addBulid = useCallback(async (form) => {

    }, []);
    const editBuild = useCallback(() => {

    }, []);

    return (
        <ContentLayout Com={<div>
            <hr className='hrMargin' />
            <ShowBuildNameAndClickNode
                builds={builds}
                clickIndex={clickIndexFn}
                addAndOpenForm={addAndOpenForm} />
            <hr className='hrMargin' />
            <BuildInfoAndOperate
                build={builds?.[showBuildIndex]}
                builds={builds}
                isLoading={isLoading}
                editAndOpenForm={editAndOpenForm} />
            <BuildModel
                title={"noname"}
                isOpen={formState.isOpen}
                onCancel={closeForm}
                defaultValues={formState.editMode === FORM_OPEN_MODE.ADD ? {} : { name: builds[showBuildIndex]?.name }} />
        </div>} />
    )
}
