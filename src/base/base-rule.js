/**
 * Basic rule structure for other rules to extend on
 */
export class BaseRule {
    /**
     * @constructor
     */
    constructor(options) {
        this.options = Object.assign({}, options);
    }

    /**
     * Dispose function that clears memory
     */
    dispose() {
        delete this.options;
    }

    /**
     * Regardless of the rule type, this is the execution point for all rules
     * @param item {object}: the item to execute the rule on
     * @returns {boolean}: did the rule execution pass or fail.
     */
    execute(item) {
        return true;
    }
}