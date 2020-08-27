import {BaseRule} from "../base/base-rule.js";

export class ContainsRule extends BaseRule {
    execute(item) {
        return this.getValue(item).indexOf(this.options.value) != -1;
    }
}