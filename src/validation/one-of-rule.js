import {BaseRule} from "../base/base-rule.js";

export class OneOfRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = value.indexOf(${this.getCodeValueStr()}) != -1;`;
    }

    execute(item) {
        const value = this.getValue(item);
        return value.indexOf(this.options.value) != -1;
    }
}