import React, { useState, useEffect, useCallback } from 'react'
import { Modal } from 'antd';

import SimpleFormCreator from '../../components/SimpleFormCreator';

import { Observe, Observer } from '../../util';

export default function BuildModel({ isOpen, onCancel, title, defaultValues, formItems }) {
    const [observe, setObserve] = useState(new Observe(Observe.OBSERVE_TYPE.pull));
    const [observer, setObserver] = useState(new Observer());
    const onOk = useCallback(() => observer.request(), []);

    useEffect(() => {
        observer.addRequest(form => {
            console.log(form);
        });
        observe.addObserver(observer);
        return () => {
            console.log(`清理订阅`);
            observe.destory();
            observer.destory();
            //问题所在
            // setObserve(v => null);
            // setObserver(v => null);
        }
    }, []);
    return (
        <Modal title={title} visible={isOpen} onCancel={onCancel} onOk={onOk} >
            <SimpleFormCreator defaultValues={defaultValues} formItems={formItems} customizeFinish customizeObserve={observe} />
        </Modal>
    )
}
