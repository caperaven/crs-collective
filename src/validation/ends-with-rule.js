import {BaseRule} from "../base/base-rule.js";

export class EndsWithRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = value.endsWith("${this.options.value}");`;
    }

    execute(item) {
        return this.getValue(item).endsWith(this.options.value);
    }
}