/**
 * Basic rule structure for other rules to extend on
 */
export class BaseRule {
    /**
     * @constructor
     */
    constructor(options) {
        this.options = Object.assign({}, options);
        this.getValue = this.options.field != null ? item => item[this.options.field] : item => item[this.options.index];
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

    getCodeValueStr() {
        return typeof this.options.value == "string" ? `"${this.getCodeValueTyped()}"` : this.getCodeValueTyped();
    }

    getCodeValueTyped() {
        switch(this.options.dataType) {
            case undefined: return this.options.value;
            case "date": return `new Date(${this.options.value})`;
            case "number": return `Number(${this.options.value})`;
        }
    }

    getValueStr() {
        return this.options.field != null ? `value = item.${this.options.field}` : `value = item[${this.options.index}]`;
    }
}