import {BaseSet} from "./../base/base-set.js";

export class UpdateRuleSet extends BaseSet {
    execute(collection) {
        let result = true;
        for (let item of collection) {
            result = super.execute(item);
            if (result == false) break;
        }
        return result;
    }
}