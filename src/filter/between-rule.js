import {BaseRule} from "../base/base-rule.js";

export class BetweenRule extends BaseRule {
    execute(item) {
        const value = this.getValue(item);
        return value >= this.options.value && value <= this.options.value;
    }
}