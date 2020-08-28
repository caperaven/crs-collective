import {BaseRule} from "../base/base-rule.js";

export class ContainsRule extends BaseRule {
    execute(item) {
        const value = this.getValue(item);
        return value.indexOf && value.indexOf(this.options.value) != -1;
    }
}