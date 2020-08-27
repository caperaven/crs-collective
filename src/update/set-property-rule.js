import {BaseRule} from "../base/base-rule.js";

export class SetPropertyRule extends BaseRule {
    constructor(options) {
        super(options);

        if (options.condition != null) {
            this.evaluate = new Function("model", `return ${options.condition}`);
        }
    }

    dispose() {
        delete this.evaluate;
        super.dispose();
    }

    execute(item) {
        if (this.isValid(item) == true)
        {
            item[this.options.field] = this.options.value;
        }

        return true;
    }

    isValid(item) {
        if (this.evaluate && this.evaluate(item) == false) {
            return false;
        }

        if (this.options.ruleSet && this.options.ruleSet.execute(item) == false) {
            return false;
        }

        return true;
    }
}