import { simpleRequest, METHOD_TYPE } from '../util/request';

//查询所有的房间信息
const getAllRoom = (data, config = {}) => simpleRequest.request({ url: "room/getAll", method: METHOD_TYPE.post, data, ...config });

//添加房间信息
const addRoom = (data, config = {}) => simpleRequest.request({
    url: "room/add", method: METHOD_TYPE.post, data, ...config
});

//删除房间信息
const delRoom = (data, config = {}) => simpleRequest.request({
    url: "room/del", method: METHOD_TYPE.post, data, ...config
});

//修改房间信息
const editRoom = (data, config = {}) => simpleRequest.request({
    url: "room/edit", method: METHOD_TYPE.post, data, ...config
});

export {
    getAllRoom, addRoom, delRoom, editRoom
}