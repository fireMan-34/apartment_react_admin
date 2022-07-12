import { useState, useEffect, useCallback } from 'react';

import { Button, Drawer, Table, } from "antd";

import SimpleFormCreator from '../../components/SimpleFormCreator';
import { FormItems, FormItemDefaultValues } from './commonFn';

const curryButton = ({ name, click }) => <Button type="dashed" size="small" onClick={click}>{name}</Button>


export default function useGetControlRoomTable(params) {

    const [data, setData] = useState([]);
    const [IsOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({});

    const onClose = () => setIsOpen(v => false);

    const deleteColum = useCallback((record) => {
        // console.log("数据", data);??

        const AfterDeleteData = data.filter(({ key }) => key === record.key);
        setData(AfterDeleteData);
    });
    const modifyColum = useCallback(record => {
        setIsOpen(v => true);
        setFormData(v => record);
    }, [data]);

    const [colums] = useState(
        [
            {
                title: "房型名称",
                dataIndex: "name",
                key: "rootName"
            },
            {
                title: "床数量",
                dataIndex: "beds",
                key: "beds"
            },
            {
                title: "价格",
                dataIndex: "price",
                key: "price"
            },
            {
                title: "押金",
                dataIndex: "yaPrice",
                key: "yaPrice"
            },
            {
                title: "简称",
                dataIndex: "shortName",
                key: "shortName"
            },
            {
                title: "入住人数",
                dataIndex: "liveLimit",
                key: "liveLimit"
            },
            {
                title: "早餐券数量",
                dataIndex: "couponNum",
                key: "couponNum"
            },
            {
                title: "操作",
                render: (_, record) => (
                    <div className="buttonFlex" >
                        {curryButton({ name: "删除", click: () => deleteColum(record) })}
                        {curryButton({ name: "修改", click: () => modifyColum(record) })}
                    </div>
                )
            }
        ]
    );


    useEffect(() => {

        const dataSource = [
            {
                key: 1,
                name: '单人房',
                beds: 1,
                price: 100,
                yaPrice: 20,
                shortName: '单',
                liveLimit: 1,
                couponNum: 1,

            },
            {
                key: 2,
                name: '双人房',
                beds: 2,
                price: 150,
                yaPrice: 20,
                shortName: '双',
                liveLimit: 2,
                couponNum: 2,

            }
        ];
        setData(v => dataSource);
        setIsLoading(v => false);

    }, [])
    return {
        Room_Table: (<Table dataSource={data} columns={colums} loading={isLoading}></Table>),
        Room_Update_Form: (<Drawer visible={IsOpen} onClose={onClose}>
            <SimpleFormCreator title={"更新房间"} formItems={FormItems} defaultValues={{ ...FormItemDefaultValues, formData }} initialValues={formData} />
        </Drawer>)
    }
};
