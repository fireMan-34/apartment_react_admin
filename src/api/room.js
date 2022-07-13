import { simpleRequest, METHOD_TYPE } from '../util/request';

const getAllRoom = (data, config = {}) => simpleRequest.request({ url: "/room/getAll", method: METHOD_TYPE.post, data, ...config });
const addRoom = (data, config = {}) => simpleRequest.request({
    url: "/room/add", method: METHOD_TYPE.post, data, ...config
});
const delRoom = (data, config = {}) => simpleRequest.request({ url: "/room/del", data, ...config });
const editRoom = (data, config = {}) => simpleRequest.request({ url: "/room/edit", data, ...config });

export {
    getAllRoom, addRoom, delRoom, editRoom
}