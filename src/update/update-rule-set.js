import {BaseSet} from "./../base/base-set.js";

export class UpdateRuleSet extends BaseSet {
    execute(collection) {
        let result = true;
        for (let item of collection) {
            result = super.execute(item, false);
        }
        return result;
    }
}