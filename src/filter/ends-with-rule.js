import {BaseRule} from "../base/base-rule.js";

export class EndsWithRule extends BaseRule {
    execute(item) {
        return item[this.options.field].endsWith(this.options.value);
    }
}