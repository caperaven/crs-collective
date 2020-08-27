import {BaseSet} from "./../base/base-set.js";

export class UpdateRuleSet extends BaseSet {
    execute(collection) {
        for (let item of collection) {
            for (let rule of this._rules) {
                rule.execute(item);
            }
        }
        return true;
    }
}