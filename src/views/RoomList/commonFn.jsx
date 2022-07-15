import { Tag, Button } from 'antd';

import { rules, formType } from '../../components/SimpleFormCreator';

const colums = function (handlerDel, openEdit) {
    return [
        { title: '房间名称', key: 'roomName' },
        { title: '楼层', key: 'floor' },
        {
            title: '是否有窗', key: 'hasWindow', render(_, row) {
                const { hasWindow } = row
                const theme = hasWindow ? 'success' : 'danger'
                const txt = hasWindow ? '有' : '无'
                return <Tag theme={theme} variant="light"> {txt} </Tag>
            }
        },
        {
            title: '靠近马路', key: 'isClose2Road', render(_, row) {
                const { isClose2Road } = row
                const theme = isClose2Road ? 'success' : 'danger'
                const txt = isClose2Road ? '是' : '否'
                return <Tag theme={theme} variant="light"> {txt} </Tag>
            }
        },
        {
            title: '允许吸烟', key: 'isSmoke', render(_, row) {
                const { isSmoke } = row
                const theme = isSmoke ? 'success' : 'danger'
                const txt = isSmoke ? '是' : '否'
                return <Tag theme={theme} variant="light"> {txt} </Tag>
            }
        },
        {
            title: '高温房', key: 'isHigh', render(_, row) {
                const { isHigh } = row
                const theme = isHigh ? 'success' : 'danger'
                const txt = isHigh ? '是' : '否'
                return <Tag theme={theme} variant="light"> {txt} </Tag>
            }
        },

        {
            title: '操作', key: 'key',
            render: (_, row) => {
                return <div className='dispalyFlexButton'>
                    <Button variant="outline" size="small" onClick={() => handlerDel(row._id)}>删除</Button>
                    <Button variant="outline" style={{ marginLeft: '5px' }} size="small" onClick={() => openEdit(row)}>修改</Button>
                </div>
            }
        }
    ].map(o => ({ ...o, dataIndex: o.key }));
};
const mockDataSorce = [
    {
        key: "______",
        roomName: "好房子",
        floor: 2,
        hashWindow: true,
        isClose2Road: false,
        isSmoke: false,
        isHigh: false,
    }
];
const RADIO_GROUP_BOOLEAN_SELECT = {
    type: formType.RADIO_GROUP,
    args: {
        buttonStyle: "solid",
        options: [
            { value: true, label: "是" },
            { value: false, label: "否" },
        ]
    }
}
const roomItems = [
    {
        label: "房间名",
        name: "roomName",
        rules: [rules.required],
        type: formType.INPUT,
    },
    {
        label: "所在楼栋楼层",
        name: "bandf",
        rules: [rules.required],
        type: formType.CASECADER,
        args: {

        }
    },
    {
        label: "选择房型",
        name: "type",
        rules: [rules.required],
        type: formType.SELECT,
        args: {

        }
    },
    {
        label: "内线电话",
        name: "phone4in",
        type: formType.INPUT,
        args: {
            placeholder: "请填写内线电话"
        }
    },
    {
        label: "外线电话",
        name: "phone4in",
        type: formType.INPUT,
        args: {
            placeholder: "请填写外线电话"
        }
    },
    {
        label: "方向朝向",
        name: "direction",
        type: formType.RADIO_GROUP,
        args: {
            buttonStyle: "solid",
            options: [
                { value: "1", label: "东" },
                { value: "2", label: "西" },
                { value: "3", label: "南" },
                { value: "4", label: "北" },
            ]
        }
    },
    {
        label: "是否有窗户",
        name: "hasWindow",
        ...RADIO_GROUP_BOOLEAN_SELECT
    },
    {
        label: "是否有允许吸烟",
        name: "isSmoke",
        ...RADIO_GROUP_BOOLEAN_SELECT
    },
    {
        label: "是否靠近马路",
        name: "isClose2Road",
        ...RADIO_GROUP_BOOLEAN_SELECT,
        rules: [rules.required]
    },
    {
        label: "是否是噪音房",
        name: "isNoise",
        ...RADIO_GROUP_BOOLEAN_SELECT,
        rules: [rules.required]
    },
    {
        label: "是否是高温房",
        name: "isHigh",
        ...RADIO_GROUP_BOOLEAN_SELECT,
        rules: [rules.required]
    }

];
export {
    colums, mockDataSorce, roomItems
}