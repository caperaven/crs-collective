/**
 * Create a set of rules to execute
 */
export class BaseSet {
    /**
     * @constructor
     */
    constructor(rules) {
        this._rules = [];

        if (rules != null) {
            this.add(rules);
        }
    }

    /**
     * Free memory before releasing object
     */
    dispose() {
        this._rules.forEach(rule => rule.dispose());
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
     * @returns {boolean} did the set pass of rail execution
     */
    execute(item) {
        let result = true;

        for (let rule of this._rules) {
            result = rule.execute(item);
            if (result == false) break;
        }

        return result;
    }

    toFunction() {
        const src = ["let value;", "let valid = true"];

        for (let rule of this._rules) {
            src.push(rule.code);
            src.push("if (valid == false) return false;");
        }

        src.push("return valid");
        return new Function("item", src.join("\n"));
    }
}