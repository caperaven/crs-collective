import {SetPropertyRule} from "./set-property-rule.js";

export class DeletePropertyRule extends SetPropertyRule {
    execute(item) {
        if (this.isValid(item) == true) {
            delete item[this.options.field];
        }
        return true;
    }
}