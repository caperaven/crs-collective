import {BaseRule} from "../base/base-rule.js";

export class ContainsRule extends BaseRule {
    execute(item) {
        return item[this.options.field].indexOf(this.options.value) != -1;
    }
}