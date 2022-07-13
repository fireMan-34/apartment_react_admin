import { simpleRequest, METHOD_TYPE } from '../util/request';

//查询所有的楼栋
const getAllBuild = (data, config = {}) => simpleRequest.request({ url: "build/getAll", method: METHOD_TYPE.post, data, ...config });

//添加楼栋
const addBuild = (data, config = {}) => simpleRequest.request({
    url: "build/add", method: METHOD_TYPE.post, data, ...config
});

//删除楼栋
const delBuild = (data, config = {}) => simpleRequest.request({ url: "build/del", data, ...config });

//修改楼栋
const editBuild = (data, config = {}) => simpleRequest.request({ url: "build/edit", data, ...config });

export {
    getAllBuild, addBuild, delBuild, editBuild
}