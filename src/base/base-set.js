/**
 * Create a set of rules to execute
 */
export class BaseSet {
    /**
     * @constructor
     */
    constructor() {
        this._rules = [];
    }

    /**
     * Free memory before releasing object
     */
    dispose() {
        this._rules.length = 0;
        delete this._rules;
    }

    /**
     * Add a rule to the rules collection for execution
     * @param rules {BaseRule} Rule to execute
     */
    add(rules) {
        if (Array.isArray(rules)) {
            rules.forEach(rule => this._rules.push(rule));
        }
        else {
            this._rules.push(rules);
        }
    }

    /**
     * Execute the ruleset on a item
     * @param item {Obect} what item do you want to execute the rules on
     * @param endOnFail {boolean} default is true, stop processing as soon as a rule fails
     * @returns {boolean} did the set pass of rail execution
     */
    execute(item, endOnFail = true) {
        let result = true;

        for (let rule of this._rules) {
            result = rule.execute(item);
            if (endOnFail == true && result == false) {
                break;
            }
        }

        return result;
    }
}