import {BaseRule} from "../base/base-rule.js";

export class GreaterThanRule extends BaseRule {
    get code() {
        return `valid = value > ${this.getCodeValueStr()};`;
    }

    execute(item) {
        return this.getValue(item) > this.options.value;
    }
}