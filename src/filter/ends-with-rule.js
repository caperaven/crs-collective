import {BaseRule} from "../base/base-rule.js";

export class EndsWithRule extends BaseRule {
    execute(item) {
        return this.getValue(item).endsWith(this.options.value);
    }
}