import {BaseRule} from "../base/base-rule.js";

export class StartsWithRule extends BaseRule {
    execute(item) {
        return this.getValue(item).startsWith(this.options.value);
    }
}