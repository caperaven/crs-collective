import {BaseRule} from "../base/base-rule.js";

export class OneOfRule extends BaseRule {
    execute(item) {
        const value = this.getValue(item);
        return value.indexOf(this.options.value) != -1;
    }
}