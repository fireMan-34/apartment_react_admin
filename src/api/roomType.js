import { simpleRequest } from '../util/request';

const getAllType = simpleRequest({ method: "post", url: "roomType/getAll", })

export { getAllType }