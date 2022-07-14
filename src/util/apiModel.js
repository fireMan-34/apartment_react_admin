
//逻辑有点难，需要一个整体逻辑而不是部分逻辑之和
class ApiModelRule {
    static isApiModelRules(rule) {
        if (rule instanceof ApiModelRule) {
            return;
        }
        throw new TypeError("rule is instance of ApiModelRule");
    }
    constructor() {

    }
}
class ApiModel {
    constructor(rules) {
        this.rules = new Set();

    }
    addRules(...rules) {
        this._checkRules(rules);
        this.rules.forEach(this.rules.add(rules));
    }
    removeRules(...rules) {
        this._checkRules(rules);
        this.rules.forEach(this.rules.delete(rules));
    }
    checkParams(params, rules) {
        return params || -1;
    }
    _checkRules(rules) {
        rules.forEach(rule => ApiModelRule.isApiModelRulesO(rule));
    }
}
const apiModel = new ApiModel();
export {
    ApiModel, apiModel
}