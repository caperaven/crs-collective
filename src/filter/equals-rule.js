import {BaseRule} from "../base/base-rule.js";

export class EqualsRule extends BaseRule {
    execute(item) {
        return item[this.options.field] === this.options.value;
    }
}