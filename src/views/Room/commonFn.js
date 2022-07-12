import { formType, rules } from '../../components/SimpleFormCreator';

export const FormItems = [
    {
        label: "房间名",
        name: "name",
        rules: [rules.required, rules.stringAndNmber],
        type: formType.INPUT,
        args: {
            placeholder: "填写房间名"
        }
    },
    {
        label: "房型简称",
        name: "shortName",
        rules: [rules.required, rules.stringAndNmber],
        type: formType.INPUT,
        args: {
            placeholder: "填写房间简称"
        }
    },
    {
        label: "入住人数",
        name: "liveLimit",
        rules: [rules.stringAndNmber],
        type: formType.INPUT_NUMBER,
        args: {
            min: 1,
        }
    },
    {
        label: "床数",
        name: "beds",
        rules: [rules.stringAndNmber],
        type: formType.INPUT_NUMBER,
        args: {
            min: 1,
        }
    },
    {
        label: "价格",
        name: "price",
        rules: [rules.required, rules.stringAndNmber],
        type: formType.INPUT,
    },
    {
        label: "押金",
        name: "yaPrice",
        type: formType.INPUT,
        args: {
            placeholder: "填写押金"
        }
    },
    {
        label: "早餐券",
        name: "couponNum",
        type: formType.INPUT_NUMBER,
        args: {
            min: 0,
        }
    }

]

export const FormItemDefaultValues = {
    "liveLimit": 1,
    "beds": 1,
    "yaPrice": "无"
}