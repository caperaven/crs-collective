import {BaseRule} from "../base/base-rule.js";

export class OneOfRule extends BaseRule {
    execute(item) {
        return this.options.value.indexOf(this.getValue(item)) != -1;
    }
}