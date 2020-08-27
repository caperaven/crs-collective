import {BaseRule} from "../base/base-rule.js";

export class EqualsRule extends BaseRule {
    execute(item) {
        return this.getValue(item) === this.options.value;
    }
}