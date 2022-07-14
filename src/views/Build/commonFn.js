import { formType, rules } from '../../components/SimpleFormCreator';

const buildNameFormItems = [
    {
        label: "楼栋名",
        name: "name",
        rules: [rules.required,],
        type: formType.INPUT,
        args: {
            placeholder: "填写楼栋名"
        }
    },
];


const floorInfoNameItems = [
    {
        label: "楼层名",
        name: "floorName",
        rules: [rules.required,],
        type: formType.INPUT,
        args: {
            placeholder: "填写楼层名"
        }
    },
]

export {
    buildNameFormItems, floorInfoNameItems
}