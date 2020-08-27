import {BaseRule} from "../base/base-rule.js";

export class StartsWithRule extends BaseRule {
    execute(item) {
        return item[this.options.field].startsWith(this.options.value);
    }
}