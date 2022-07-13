import { useCallback, useEffect } from 'react';
import { Button, Divider, Form, Input, InputNumber } from 'antd';

import assignInWith from 'lodash/assignInWith';
import isUndefined from 'lodash/isUndefined';

const label = {
    span: 8
};
const wrappelCol = {
    span: 16
}

export const formType = {
    INPUT: "INPUT",
    BUTTON: "BUTTON",
    INPUT_NUMBER: "INPUT_NUMBER",
}
export const formTypeNode = {
    [formType.INPUT]: (args) => <Input {...args} />,
    [formType.Button]: (args) => <Button {...args} />,
    [formType.INPUT_NUMBER]: (args) => <InputNumber {...args} />
}

export const rules = {
    required: { required: true },
    string: { type: "string" },
    number: { type: "number" },
    stringAndNmber: { type: ["string,number"] },
    stringMustNmber: { type: "string", pattern: /^\d+(.\d+)?$/, message: "输入字符串必须是数字类型且不包含任何运算符号" }
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

export default function SimpleFormCreator({ defaultValues = {}, title, formItems, initialValues, finishFn, custtomizeFinish = false, custtomizeFinishFn = form => { } }) {
    const [form] = Form.useForm();
    const onFinish = useCallback((values) => {
        const sendData = assignInWith(values, defaultValues, (ov, sv) => isUndefined(ov) ? sv : ov);
        finishFn(sendData);
    }, []);

    useEffect(() => {
        form.setFieldsValue(defaultValues);
    }, [defaultValues])
    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues])

    return (
        <Form form={form} layout={label} wrapperCol={wrappelCol} onFinish={onFinish} initialValues={initialValues}>
            <h2>{title}</h2>
            <hr />
            {formItems.map(({ label, name, rules, type, args }) => <Form.Item key={label + name} label={label} name={name} rules={rules}>{generateFormChildren(type, args)}</Form.Item>)}
            <Divider>分割</Divider>
            {!custtomizeFinish && <Form.Item>
                <Button type='primary' htmlType='submit'>提交</Button>
            </Form.Item>}
        </Form>
    )
};