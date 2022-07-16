const path = require('path');
var assert = require('assert');
const { describe } = require('mocha');
const importTest = (name, path) => {
    describe(name, function () {
        require(path);
    });
}
describe('测试开始', function () {
    // describe('#indexOf()', function () {
    //     it('should return -1 when the value is not present', function () {
    //         assert.equal([1, 2, 3].indexOf(4), -1);
    //     });
    // });
    importTest("xls的相关测试", "./util/xlsxProvieder.test.js");

});