import { simpleRequest, METHOD_TYPE } from '../util/request';

const getAllType = (config = {}) => simpleRequest.request({ url: "/room/getAll", method: METHOD_TYPE.post, ...config });

export { getAllType }