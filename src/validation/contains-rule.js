import {BaseRule} from "../base/base-rule.js";

export class ContainsRule extends BaseRule {
    get code() {
        return `valid = value.indexOf && value.indexOf(${this.getCodeValueStr()}) != -1;`;
    }

    execute(item) {
        const value = this.getValue(item);
        return value.indexOf && value.indexOf(this.options.value) != -1;
    }
}