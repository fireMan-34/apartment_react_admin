const { describe, it } = require('mocha');
const { expect } = require('chai');
const { xlxs } = require('../index');
const { columsAndTableDataMapSheetData } = xlxs.default;

const example = {
    colums: [
        {
            title: "名字",
            dataIndex: "name",
        },
        {
            title: "年龄",
            dataIndex: "age",
        },
        {
            title: "性别",
            dataIndex: "sex",
        },
    ],
    sourceData: [
        {
            name: "fireMan34",
            age: 22,
            sex: "male",
        },
        {
            name: "iceGirl",
            age: 23,
            sex: "female",
        },
        {
            name: "sunshineGirl",
            age: 22,
            sex: "female",
        }
    ],
    result: [
        ['名字', '年龄', '性别'],
        ["fireMan34", 22, "male",],
        ["iceGirl", 23, "female",],
        ["sunshineGirl", 22, "female",]
    ],
};
const example1 = {
    colums: [
        {
            title: "名字",
            dataIndex: "name",
        },
        {
            title: "年龄",
            dataIndex: "age",
        },
        {
            title: "性别",
            dataIndex: "sex",
        },
    ],
    sourceData: [
        {
            name: "fireMan34",
            age: 22,
            sex: "male",
            bag: 5
        },
        {
            name: "iceGirl",
            age: 23,
            sex: "female",
            bag: 3
        },
        {
            name: "sunshineGirl",
            age: 22,
            sex: "female",
            bag: 2
        }
    ],
    result: [
        ['名字', '年龄', '性别'],
        ["fireMan34", 22, "male",],
        ["iceGirl", 23, "female",],
        ["sunshineGirl", 22, "female",]
    ],
};
const example2 = {
    colums: [
        {
            title: "名字",
            dataIndex: "name",
        },
        {
            title: "年龄",
            dataIndex: "age",
        },
        {
            title: "性别",
            dataIndex: "sex",
        },
    ],
    sourceData: [
        {
            name: "fireMan34",
            sex: "male",
            age: 22,
            bag: 5
        },
        {
            age: 23,
            sex: "female",
            name: "iceGirl",
            bag: 3
        },
        {
            age: 22,
            sex: "female",
            name: "sunshineGirl",
            bag: 2
        }
    ],
    result: [
        ['名字', '年龄', '性别'],
        ["fireMan34", 22, "male",],
        ["iceGirl", 23, "female",],
        ["sunshineGirl", 22, "female",]
    ],
};
const example3 = {
    colums: [
        {
            title: "名字",
            dataIndex: "name",
        },
        {
            title: "年龄",
            dataIndex: "age",
        },
        {
            title: "性别",
            dataIndex: "sex",
        },
    ],
    sourceData: [
        {
            name: "fireMan34",
            sex: true,
            age: undefined,
            bag: 5
        },
        {
            age: 23,
            sex: "female",
            name: "iceGirl",
            bag: 3
        },
        {
            age: 22,
            sex: "female",
            bag: 2
        }
    ],
    result: [
        ['名字', '年龄', '性别'],
        ["fireMan34", "", "是",],
        ["iceGirl", 23, "female",],
        ["", 22, "female",]
    ],
};
const example4 = {
    colums: [
        {
            title: "是否为帅哥",
            dataIndex: "isGoodMan"
        }
    ],
    sourceData: [
        {
            isGoodMan: true,
        }
    ],
    result: [
        ["是否为帅哥"],
        ["是"]
    ]
}
module.exports = describe("测试表单字段以及数据规范化输出处理函数", () => {
    // console.log(columsAndTableDataMapSheetData(example.colums, example.sourceData));
    it("第一个常规测试", () => expect(columsAndTableDataMapSheetData(example.colums, example.sourceData, {}),).to.deep.equal(example.result));
    it("不相关数据检测", () => expect(columsAndTableDataMapSheetData(example1.colums, example1.sourceData, {}),).to.deep.equal(example1.result));
    it("乱序数据检测", () => expect(columsAndTableDataMapSheetData(example2.colums, example2.sourceData, {}),).to.deep.equal(example2.result));
    it("缺省数据自动处理", () => expect(columsAndTableDataMapSheetData(example3.colums, example3.sourceData, {}),).to.deep.equal(example3.result));
    it(" 缺省且ant Design的table数据是否适用", () => expect(columsAndTableDataMapSheetData(example4.colums, example4.sourceData)).to.deep.equal(
        example4.result
    ));
    // it("元测试expect相同对象类型", () => expect({ key: 1, num: 0 }, { num: 0, key: 1 }));
    // it("元测试expect相同数组类型", () => expect([1, 2], [2, 1]))
});
