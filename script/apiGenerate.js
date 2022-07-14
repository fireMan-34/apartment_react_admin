const fsp = require('fs/promises');
const path = require('path');
const { apiPath } = require('./config');

const chineseInfoStr = "楼栋"
const postfixStr = "Build";
const postfixApi = "build";
const fileName = "build.js";



const workflow = async (postfixStr, postfixApi, fileName,) => {
    const moduleStr = `import { simpleRequest, METHOD_TYPE } from '../util/request';

//查询所有的${chineseInfoStr}
const getAll${postfixStr} = (data, config = {}) => simpleRequest.request({ url: "${postfixApi}/getAll", method: METHOD_TYPE.post, data, ...config });

//添加${chineseInfoStr}
const add${postfixStr} = (data, config = {}) => simpleRequest.request({
    url: "${postfixApi}/add", method: METHOD_TYPE.post, data, ...config
});

//删除${chineseInfoStr}
const del${postfixStr} = (data, config = {}) => simpleRequest.request({ 
    url: "${postfixApi}/del", method: METHOD_TYPE.post, data, ...config 
});

//修改${chineseInfoStr}
const edit${postfixStr} = (data, config = {}) => simpleRequest.request({ 
    url: "${postfixApi}/edit",method: METHOD_TYPE.post,data, ...config 
});

export {
    getAll${postfixStr}, add${postfixStr}, del${postfixStr}, edit${postfixStr}
}`;
    await fsp.writeFile(path.join(apiPath, fileName), moduleStr, { encoding: "utf-8" });

    console.log(`${chineseInfoStr} has been generated to  a api`);
};
workflow(postfixStr, postfixApi, fileName,);