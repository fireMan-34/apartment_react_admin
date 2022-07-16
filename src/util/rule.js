class Rule {
    static isInstanceOfRule(obj) {
        return obj instanceof Rule;
    }
    static checkInstanceOfRule(obj) {
        if (!obj instanceof Rule) {
            throw new TypeError("obj is not istanceOf Rule")
        }
    }
    /**
     * 
     * @param {(...args)=>boolean} match 
     * @param {(...args)=>any} exec 
     */
    constructor(match, exec) {
        this.match = match;
        this.exec = exec;
    };
    checkIsRule(obj) {
        // Rule.isInstanceOfRule(obj);
        Rule.checkInstanceOfRule(obj);
    }
};
class RuleCenter {
    constructor() {
        this.rules = new Set();
    }
    addRule(rule) {
        Rule.checkInstanceOfRule(rule);
        this.rules.add(rule);
    }
    /**
     * 
     * @param {rule[]} rules 
     */
    addRules(rules) {
        rules.forEach(rule => this.addRule(rule));
    }
    removeRule(rule) {
        Rule.checkInstanceOfRule(rule);
        this.rules.delete(rule);
    }
    removeRules(rules) {
        rules.forEach(rule => this.removeRule(rule));
    }
    destory() {
        this.rules.clear();
    }
    matchAndExecRules(...Input) {
        return [...this.rules].filter(rule => rule.match(...Input)).map(rule => rule.exec(...Input));
    }
}