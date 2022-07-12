import { simpleRequest, METHOD_TYPE } from '../util/request';

const getAllType = (data, config = {}) => simpleRequest.request({ url: "/roomtype/getAll", method: METHOD_TYPE.post, data, ...config });

const addType = (data, config = {}) => simpleRequest.request({ url: "/roomtype/add", method: METHOD_TYPE.post, data, ...config });

const delType = (data, config = {}) => simpleRequest.request({ url: "/roomtype/del", method: METHOD_TYPE.post, data, ...config });

const editType = (data, config = {}) => simpleRequest.request({ url: "/roomtype/edit", method: METHOD_TYPE.post, data, ...config });

export { getAllType, addType, delType, editType };