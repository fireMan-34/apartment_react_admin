import { utils, writeFile } from 'xlsx/xlsx.mjs';



class XLSXProvider {
    constructor() {
        this.rowKeyTypeRule = new Set();
    }
    addRowKeyTypeRule(rowKeyRule) {
        this.rowKeyTypeRule.add(rowKeyRule);
    }
}

export const xlsxProiver = ({ filename, data }) => {
    filename = filename || Date.now() + '.xlsx';
    const workSheet_name = "Sheet1";
    const workBook = utils.book_new();
    const workSheet = utils.aoa_to_sheet(data);

    utils.book_append_sheet(workBook, workSheet, workSheet_name);
    writeFile(workBook, filename);
};
/**
 * 这个函数用来映射字段数组和源数据成为xlsx规范数据
 * @param {{title:string,dataIndex:string}[]} colums
 * @param {{key1:string|number|boolean}[]} sourceData
 * @param {?{text_true:string,text_false:string,dataIndex:string,title:string,pipe:(key,value)=>value   }} config
 * @return {[colums,...string[][]]}
 */
export const columsAndTableDataMapSheetData = function (colums, sourceData, config = {}) {
    let { text_true = "是", text_false = "否", dataIndex = "dataIndex", title = "title",
        pipe = ({ key, value }) => {
            switch (typeof value) {
                case "undefined":
                    return '';
                case "object":
                    if (value === null) return "";
                    console.log(value, "是对象类型请知悉"); return "";
                case "boolean":
                    return value ? text_true : text_false;
                default: return value;

            }
        }
    } = config;

    const columnMapTitle = colums.map(colum => colum[title]);
    const columsMapDataIndex = colums.map(colum => colum[dataIndex]);
    if (columnMapTitle.length !== colums.length || columsMapDataIndex.length !== colums.length) {
        throw new TypeError(`columns has some fields about label or string is not allow`);
    };

    const everyObjectMapArray = sourceData.map(row => columsMapDataIndex.map(name => ({ key: name, value: row[name] })));
    const rowValueTranformToDefault = (pipe) => everyObjectMapArray.map(lineArr => lineArr.map(pipe));
    return [columnMapTitle, ...rowValueTranformToDefault(pipe)];

}

export default {
    xlsxProiver,
    columsAndTableDataMapSheetData
};