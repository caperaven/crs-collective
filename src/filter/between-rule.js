import {BaseRule} from "../base/base-rule.js";

/**
 * Constructor options required:
 * 1. field or index
 * 1. minValue
 * 1. maxValue
 */
export class BetweenRule extends BaseRule {
    execute(item) {
        const value = this.getValue(item);
        return value >= this.options.minValue && value <= this.options.maxValue;
    }
}