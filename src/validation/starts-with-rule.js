import {BaseRule} from "../base/base-rule.js";

export class StartsWithRule extends BaseRule {
    get code() {
        return `valid = value.startsWith("${this.options.value}");`;
    }

    execute(item) {
        return this.getValue(item).startsWith(this.options.value);
    }
}