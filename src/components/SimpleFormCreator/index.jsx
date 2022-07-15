import { useCallback, useEffect } from 'react';
import { Button, Divider, Form, Input, InputNumber, Cascader, Select, Radio } from 'antd';
import { Observe } from '../../util';

import assignInWith from 'lodash/assignInWith';
import isUndefined from 'lodash/isUndefined';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
export const formType = {
    INPUT: "INPUT",
    BUTTON: "BUTTON",
    INPUT_NUMBER: "INPUT_NUMBER",
    CASECADER: "CASECADER",
    SELECT: "SELECT",
    RADIO: "RADIO",
    RADIO_GROUP: "RADIO_GROUP",
}
export const formTypeNode = {
    [formType.INPUT]: (args) => <Input {...args} />,
    [formType.Button]: (args) => <Button {...args} />,
    [formType.INPUT_NUMBER]: (args) => <InputNumber {...args} />,
    [formType.CASECADER]: (args) => <Cascader {...args} />,
    [formType.SELECT]: (args) => <Select {...args} />,
    [formType.RADIO]: (args) => <Radio {...args} />,
    [formType.RADIO_GROUP]: (args) => <Radio.Group {...args} />,
}

export const rules = {
    required: { required: true },
    string: { type: "string" },
    number: { type: "number" },
    stringAndNmber: { type: ["string", "number"] },
    stringMustNmber: { type: ["string"], pattern: /^\d+(.\d+)?$/, message: "输入字符串必须是数字类型且不包含任何运算符号" }
}

export const initValues = {
    suiji: 301,
    num: 3,
}
export const formItems = [
    {
        label: "随机",
        name: "suiji",
        rules: [rules.required, rules.stringAndNmber],
        type: formType.INPUT,
    },
    {
        label: "数目",
        name: "num",
        rules: [rules.required],
        type: formType.INPUT_NUMBER,
        args: {
            min: 0
        }
    }
]

const generateFormChildren = (type, args) => {
    if (!formTypeNode[type]) {
        throw new TypeError(`${type} is not in formTypeNode`);
    }
    return formTypeNode[type](args);
}

export default function SimpleFormCreator({ title, formItems, initialValues = {}, finishFn = sendData => { }, customizeFinish = false, customizeObserve }) {
    const [form] = Form.useForm();
    const onFinish = useCallback((values) => {
        const sendData = assignInWith(values, initialValues, (ov, sv) => isUndefined(ov) ? sv : ov);
        finishFn(sendData);
    }, []);

    useEffect(() => {
        const checkcustomizeObserver = () => {
            if (customizeFinish && !(customizeObserve instanceof Observe)) {
                throw new TypeError('customizeObserve must be extend Observe');
            };
        }
        checkcustomizeObserver();
        return () => {
            //没必要销毁，创建主体不属于它
            // if (customizeFinish) {
            //     customizeObserve.destory();
            // }
        }
    }, []);
    useEffect(() => {
        if (customizeFinish) {
            customizeObserve.setData(form);
        };
    }, [form]);

    // useEffect(() => {
    // form.setFieldsValue(defaultValues);
    // }, [defaultValues])
    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(initialValues);
    }, [initialValues])

    return (
        <Form form={form} {...layout} onFinish={onFinish}>
            <h2>{title}</h2>
            <hr />
            {formItems.map(({ label, name, rules, type, args }) => <Form.Item key={label + name} label={label} name={name} rules={rules}>{generateFormChildren(type, args)}</Form.Item>)}
            <Divider>分割</Divider>
            {!customizeFinish && <Form.Item>
                <Button type='primary' htmlType='submit'>提交</Button>
            </Form.Item>}
            {/* <Form.Item label="TesT" name={"Test"} rules={[{ type: ["number", "string"] }]}>

            </Form.Item> */}
        </Form>
    )
};