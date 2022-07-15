import { simpleRequest, METHOD_TYPE } from '../util/request';

const addAdmin = (data, config = {}) => simpleRequest.request({ url: "/admin/add", data, method: METHOD_TYPE.post, config });
const loginAdmin = (data, config = {}) => simpleRequest.request({ url: "/admin/login", data, method: METHOD_TYPE.post, config });

export {
    addAdmin, loginAdmin
}