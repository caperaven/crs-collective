import {BaseRule} from "../base/base-rule.js";

export class BetweenRule extends BaseRule {
    execute(item) {
        const value = item[this.options.field];
        return value >= this.options.value && value <= this.options.value;
    }
}