import {BaseRule} from "../base/base-rule.js";

export class SetValueRule extends BaseRule {
    constructor(options) {
        super(options);

        if (options.condition != null) {
            this.evaluate = new Function("item", `return ${options.condition}`);
        }
    }

    dispose() {
        delete this.evaluate;
        super.dispose();
    }

    execute(item) {
        if (this.evaluate && this.evaluate(item) == false) {
            return false;
        }

        item[this.options.field] = this.options.value;
        return true;
    }
}