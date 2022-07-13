import { formType, rules } from '../../components/SimpleFormCreator';

const addBuildNameFormItems = [
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

const editBuildNameFormItems = addBuildNameFormItems;

const editFloorInfoNameItems = [
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
    addBuildNameFormItems, editBuildNameFormItems, editFloorInfoNameItems
}