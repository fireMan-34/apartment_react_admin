import React, { useState, useEffect, useCallback } from 'react'
import { Modal } from 'antd';

import SimpleFormCreator from '../../components/SimpleFormCreator';

import { Observe, Observer } from '../../util';

export default function BuildModel({ isOpen, onCancel, title, initialValues, formItems, submitFn }) {
    const [observe,] = useState(new Observe(Observe.OBSERVE_TYPE.pull));
    const [observer,] = useState(new Observer());
    const onOk = useCallback(() => observer.request(), []);

    useEffect(() => {
        observe.addObserver(observer);
        return () => {
            // console.log(`清理订阅`);
            observe.destory();
            observer.destory();
            //问题所在:严格模式下，会自动刷新且保持上一次状态情况，导致卸载阶段的处理到现在阶段的时候触发。
            // setObserve(v => null);
            // setObserver(v => null);
        }
    }, []);

    useEffect(() => {
        let request = form => {
            submitFn(form);
        };
        observer.addRequest(request);
        return () => {
            observer.removeRequest(request);
            request = null;
        };

    }, [submitFn]);
    // useEffect(() => {
    //     console.log(submitFn);
    // }, [submitFn]);
    return (
        <Modal title={title} visible={isOpen} onCancel={onCancel} onOk={onOk} >
            <SimpleFormCreator initialValues={initialValues} formItems={formItems} customizeFinish customizeObserve={observe} />
        </Modal>
    )
}
