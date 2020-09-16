/**
 * Trim the left and right spaces off a string
 * @param value {string} value to trim
 * @returns {string} value without leading or trailing spaces.
 */
export function trim(value) {
    return value.trim ? value.trim() : value;
}

/**
 * Trim the left spaces off the string
 * @param value {string} value to trim
 * @returns {string} value without the left spaces
 */
export function leftTrim(value) {
    return value.trimLeft ? value.trimLeft() : value;
}

/**
 * Trim the right spaces off the string
 * @param value {string} value to trim
 * @returns {string} value without the right spaces
 */
export function rightTrim(value) {
    return value.trimRight ? value.trimRight() : value;
}

/**
 * Transform the text  to uppercase
 * @param value {string} value to process
 * @returns {string} uppercase text
 */
export function toUpperCase(value) {
    return value.toUpperCase ? value.toUpperCase() : value;
}

/**
 * Transform the text  to lowercase
 * @param value {string} value to process
 * @returns {string} lowercase text
 */
export function toLowerCase(value) {
    return value.toLowerCase ? value.toLowerCase() : value;
}

/**
 * Get a substring of value passed
 * @param value {string} value to process
 * @param from {number} start index
 * @param length {number} how many characters to copy
 * @returns {string} result string copied from value
 */
export function subString(value, from, length) {
    return value.substr ? value.substr(from, length) : value;
}

/**
 * concat values
 * examples:
 * 1. crsCollective.actions.concat("Hello", "World");           // standard parameters
 * 2. crsCollective.actions.concat(["Hello", "World"]);         // parameters as an array of values
 * 3. crsCollective.actions.concat(["Hello", "World"], "2");    // combination of 1 and 2
 * @param args
 * @returns {string}
 */
export function concat(...args) {
    const result = [];
    args.forEach(item => {
        if (Array.isArray(item)) {
            item.forEach(value => result.push(value));
        }
        else {
            result.push(item)
        }
    });
    return result.join("");
}

export function utcnow() {

}

export function datemod() {

}

export function datediff(date1, date2) {
    return date2 - date1;
}

export function year(date) {

}

export function month(date) {

}

export function day(date) {

}

export function hour(date) {

}

export function minutes(date) {

}

export function seconds(date) {

}

/**
 * Get the maximum value
 * examples:
 * 1. crsCollective.actions.max(1, 2, 3)         // standard arguments
 * 2. crsCollective.actions.max([1, 2, 3])       // parameters as an array of values
 * 3. crsCollective.actions.max([1, 2, 3], 4, 5) // combination of 1 and 2
 * @param values {numbers} values to compare
 * @returns {number} the largest number
 */
export function max(...values) {
    let val = [];
    const length = arguments.length;
    for (let i = 0; i < length; i++) {
        const arg = arguments[i];
        if (Array.isArray(arg)) {
            val = [...val, ...arg];
        }
        else {
            val.push(arg);
        }
    }
    return Math.max(...val);
}

/**
 * Get the min value
 * examples:
 * 1. crsCollective.actions.min(1, 2, 3)         // standard arguments
 * 2. crsCollective.actions.min([1, 2, 3])       // parameters as an array of values
 * 3. crsCollective.actions.min([1, 2, 3], 4, 5) // combination of 1 and 2
 * @param values {numbers} values to compare
 * @returns {number} the smallest number
 */
export function min(...values) {
    let val = [];
    const length = arguments.length;
    for (let i = 0; i < length; i++) {
        const arg = arguments[i];
        if (Array.isArray(arg)) {
            val = [...val, ...arg];
        }
        else {
            val.push(arg);
        }
    }
    return Math.min(...val);
}

export function abs(value) {
    return Math.abs(value);
}

export function pow(base, expoonent) {
    return Math.pow(base, expoonent);
}