import {BaseRule} from "../base/base-rule.js";

export class OneOfRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = ${JSON.stringify(this.options.value)}.indexOf(value) != -1;`;
    }

    execute(item) {
        const value = this.getValue(item);
        return this.options.value.indexOf(value) != -1;
    }
}