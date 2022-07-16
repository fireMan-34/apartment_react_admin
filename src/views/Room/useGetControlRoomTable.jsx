import { useState, useEffect, useCallback } from 'react';

import { Button, Drawer, Table, message, } from "antd";

import SimpleFormCreator from '../../components/SimpleFormCreator';
import DelAlertPopconfirm from '../../components/DelAlertPopconfirm';
import ExportTable from '../../components/ExportTable';
import { FormItems, FormItemDefaultValues } from './commonFn';

import { getAllType, editType, delType } from '../../api/roomType';

const curryButton = ({ name, click }) => <Button type="dashed" size="small" onClick={click}>{name}</Button>


export default function useGetControlRoomTable({ isLoading, setIsLoading, }) {

    const [data, setData] = useState([]);
    const [IsOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const onClose = () => setIsOpen(v => false);

    const getAllTypeRequest = async () => {
        try {
            setIsLoading(true);
            const { data, success, info, count } = await getAllType();
            const TableData = data.map(o => ({ key: o._id, ...o }));
            setData(TableData);
            setIsLoading(false);
            message.info(info);
        } catch (err) {

        }
    };
    const editTypeRequest = async (sendData) => {
        if (isLoading) {
            message.info("请求占用中,稍后再尝试");
            return;
        }
        setIsLoading(true);
        const { success, info } = await editType({ typeid: sendData._id, ...sendData });
        message.info(info);
        setIsLoading(false);
        if (!success) return;
        setIsOpen(false);
        await getAllTypeRequest();
    }

    const deleteColum = useCallback(async (record) => {
        setIsLoading(true);
        const { success, info } = await delType({ typeid: record._id });
        setIsLoading(false);
        message.info(info);
        if (!success) {
            return
        }
        else {
            await getAllTypeRequest();
        }
    }, []);
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
                        {curryButton({ name: "修改", click: () => modifyColum(record) })}
                        <DelAlertPopconfirm Com={curryButton({ name: "删除" })} onConfirm={() => deleteColum(record)} />
                    </div>
                )
            }
        ]
    );
    useEffect(() => {
        console.log(data);
    }, [formData, data]);

    useEffect(() => {
        getAllTypeRequest();
    }, []);

    return {
        Room_Table: (<Table dataSource={data} columns={colums} loading={isLoading} footer={data => {
            console.log("footer", data)
            return <div>123</div>
        }}></Table>),
        Room_Update_Form: (<Drawer visible={IsOpen} onClose={onClose}>
            <SimpleFormCreator title={"更新房间"} formItems={FormItems} initialValues={{ ...FormItemDefaultValues, ...formData }} finishFn={editTypeRequest} />
        </Drawer>),
        Room_Table_Down: (<ExportTable
            colums={colums.filter(colum => colum.title !== "操作")}
            data={data}
            fileName={"房型维护.xlsx"}
        />),
        Renew_Data: getAllTypeRequest
    }
};
