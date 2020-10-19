/**
 * Create a set of rules to execute
 */
class BaseSet {
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

/**
 * Basic rule structure for other rules to extend on
 */
class BaseRule {
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

class StartsWithRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = value.startsWith("${this.options.value}");`;
    }

    execute(item) {
        return this.getValue(item).startsWith(this.options.value);
    }
}

class EndsWithRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = value.endsWith("${this.options.value}");`;
    }

    execute(item) {
        return this.getValue(item).endsWith(this.options.value);
    }
}

class EqualsRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = value === ${this.getCodeValueStr()};`;
    }

    execute(item) {
        return this.getValue(item) === this.options.value;
    }
}

class NotEqualsRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = value !== ${this.getCodeValueStr()};`;
    }

    execute(item) {
        return this.getValue(item) !== this.options.value;
    }
}

class ContainsRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = value.indexOf && value.indexOf(${this.getCodeValueStr()}) != -1;`;
    }

    execute(item) {
        const value = this.getValue(item);
        return value.indexOf && value.indexOf(this.options.value) != -1;
    }
}

class GreaterThanRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = value > ${this.getCodeValueStr()};`;
    }

    execute(item) {
        return this.getValue(item) > this.options.value;
    }
}

class LessThanRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = value < ${this.getCodeValueStr()};`;
    }

    execute(item) {
        return this.getValue(item) < this.options.value;
    }
}

/**
 * Constructor options required:
 * 1. field or index
 * 1. minValue
 * 1. maxValue
 */
class BetweenRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = value >= ${this.options.minValue} && value <= ${this.options.maxValue};`
    }

    execute(item) {
        const value = this.getValue(item);
        return value >= this.options.minValue && value <= this.options.maxValue;
    }
}

class OneOfRule extends BaseRule {
    get code() {
        return `${this.getValueStr()}; valid = ${JSON.stringify(this.options.value)}.indexOf(value) != -1;`;
    }

    execute(item) {
        const value = this.getValue(item);
        return this.options.value.indexOf(value) != -1;
    }
}

class SetPropertyRule extends BaseRule {
    constructor(options) {
        super(options);

        if (options.condition != null) {
            this.evaluate = new Function("model", `return ${options.condition}`);
        }
    }

    dispose() {
        delete this.evaluate;
        super.dispose();
    }

    execute(item) {
        if (this.isValid(item) == true)
        {
            item[this.options.field] = this.options.value;
        }

        return true;
    }

    isValid(item) {
        if (this.evaluate && this.evaluate(item) == false) {
            return false;
        }

        if (this.options.ruleSet && this.options.ruleSet.execute(item) == false) {
            return false;
        }

        return true;
    }
}

class DeletePropertyRule extends SetPropertyRule {
    execute(item) {
        if (this.isValid(item) == true) {
            delete item[this.options.field];
        }
        return true;
    }
}

class UpdateRuleSet extends BaseSet {
    execute(collection) {
        for (let item of collection) {
            for (let rule of this._rules) {
                rule.execute(item);
            }
        }
        return true;
    }

    toFunction(options) {
        return null;
    }
}

class SerializableFilter {
    constructor() {
        this.oneOfMap = new Map();
        this.betweenMap = new Map();
        this.lessThanMap = new Map();
        this.greaterThanMap = new Map();
        this.equalsMap = new Map();
        this.notEqualsMap = new Map();
        this.startsWithMap = new Map();
        this.endsWithMap = new Map();
        this.containsMap = new Map();

        this.oneOf = this.setRawMapValue.bind(this.oneOfMap);
        this.between = this.setMapValue.bind(this.betweenMap);
        this.lessThan = this.setMapValue.bind(this.lessThanMap);
        this.greaterThan = this.setMapValue.bind(this.greaterThanMap);
        this.equals = this.setMapValue.bind(this.equalsMap);
        this.startsWith = this.setMapValue.bind(this.startsWithMap);
        this.endsWith = this.setMapValue.bind(this.endsWithMap);
        this.contains = this.setMapValue.bind(this.containsMap);
        this.notEquals = this.setMapValue.bind(this.notEqualsMap);
    }

    dispose() {
        this.oneOf = null;
        this.between = null;
        this.lessThan = null;
        this.greaterThan = null;
        this.equals = null;
        this.startsWith = null;
        this.endsWith = null;
        this.contains = null;
        this.notEquals = null;

        this.oneOfMap.clear();
        this.betweenMap.clear();
        this.lessThanMap.clear();
        this.greaterThanMap.clear();
        this.equalsMap.clear();
        this.startsWithMap.clear();
        this.endsWithMap.clear();
        this.containsMap.clear();
        this.notEqualsMap.clear();

        this.oneOfMap = null;
        this.betweenMap = null;
        this.lessThanMap = null;
        this.greaterThanMap = null;
        this.equalsMap = null;
        this.startsWithMap = null;
        this.endsWithMap = null;
        this.containsMap = null;
        this.notEqualsMap = null;
    }

    clear() {
        this.oneOfMap.clear();
        this.betweenMap.clear();
        this.lessThanMap.clear();
        this.greaterThanMap.clear();
        this.equalsMap.clear();
        this.notEqualsMap.clear();
        this.startsWithMap.clear();
        this.endsWithMap.clear();
        this.containsMap.clear();
    }

    setMapValue(field, ...values) {
        let result = values;
        if (result.length == 1) {
            result = result[0];
        }
        this.set(field, result);
    }

    setRawMapValue(field, values) {
        this.set(field, values);
    }

    toSchema() {
        const result = [];

        this.toArray("one-of", this.oneOfMap, result);
        this.toArray("between", this.betweenMap, result);
        this.toArray("less-than", this.lessThanMap, result);
        this.toArray("greater-than", this.greaterThanMap, result);
        this.toArray("equals", this.equalsMap, result);
        this.toArray("not-equals", this.notEqualsMap, result);
        this.toArray("starts-with", this.startsWithMap, result);
        this.toArray("ends-with", this.endsWithMap, result);
        this.toArray("contains", this.containsMap, result);

        return result;
    }

    fromSchema(schema) {
        const functions = {
            "one-of": this.oneOf,
            "between": this.between,
            "less-than": this.lessThan,
            "greater-than": this.greaterThan,
            "equals": this.equals,
            "not-equals": this.notEquals,
            "starts-with": this.startsWith,
            "ends-with": this.endsWith,
            "contains": this.contains
        };

        for(const item of schema) {
            functions[item.rule](item.field, item.value);
        }
    }

    toArray(rule, map, array) {
        map.forEach((value, key) => array.push({
            "rule": rule,
            "field": key,
            "value": value
        }));
    }

    toFunction(options) {
        let filter = new BaseSet();
        options = options || {};
        this.oneOfMap.forEach((value, key) => filter.add(new OneOfRule({field: key, value: value, dataType: options[key]})));
        this.betweenMap.forEach((value, key) => filter.add(new BetweenRule({field: key, minValue: value[0], maxValue: value[1], dataType: options[key]})));
        this.lessThanMap.forEach((value, key) => filter.add(new LessThanRule({field: key, value: value, dataType: options[key]})));
        this.greaterThanMap.forEach((value, key) => filter.add(new GreaterThanRule({field: key, value: value, dataType: options[key]})));
        this.equalsMap.forEach((value, key) => filter.add(new EqualsRule({field: key, value: value, dataType: options[key]})));
        this.notEqualsMap.forEach((value, key) => filter.add(new NotEqualsRule({field: key, value: value, dataType: options[key]})));
        this.startsWithMap.forEach((value, key) => filter.add(new StartsWithRule({field: key, value: value, dataType: options[key]})));
        this.endsWithMap.forEach((value, key) => filter.add(new EndsWithRule({field: key, value: value, dataType: options[key]})));
        this.containsMap.forEach((value, key) => filter.add(new ContainsRule({field: key, value: value, dataType: options[key]})));
        const result = filter.toFunction(options);
        filter.dispose();
        filter = null;
        return result;
    }
}

/**
 * Trim the left and right spaces off a string
 * @param value {string} value to trim
 * @returns {string} value without leading or trailing spaces.
 */
function trim(value) {
    return value.trim ? value.trim() : value;
}

/**
 * Trim the left spaces off the string
 * @param value {string} value to trim
 * @returns {string} value without the left spaces
 */
function leftTrim(value) {
    return value.trimLeft ? value.trimLeft() : value;
}

/**
 * Trim the right spaces off the string
 * @param value {string} value to trim
 * @returns {string} value without the right spaces
 */
function rightTrim(value) {
    return value.trimRight ? value.trimRight() : value;
}

/**
 * Transform the text  to uppercase
 * @param value {string} value to process
 * @returns {string} uppercase text
 */
function toUpperCase(value) {
    return value.toUpperCase ? value.toUpperCase() : value;
}

/**
 * Transform the text  to lowercase
 * @param value {string} value to process
 * @returns {string} lowercase text
 */
function toLowerCase(value) {
    return value.toLowerCase ? value.toLowerCase() : value;
}

/**
 * Get a substring of value passed
 * @param value {string} value to process
 * @param from {number} start index
 * @param length {number} how many characters to copy
 * @returns {string} result string copied from value
 */
function subString(value, from, length) {
    return value.substr ? value.substr(from, length) : value;
}

/**
 * concat values
 * examples:
 * 1. crsCollective.processors.concat("Hello", "World");           // standard parameters
 * 2. crsCollective.processors.concat(["Hello", "World"]);         // parameters as an array of values
 * 3. crsCollective.processors.concat(["Hello", "World"], "2");    // combination of 1 and 2
 * @param args
 * @returns {string}
 */
function concat(...args) {
    const result = [];
    args.forEach(item => {
        if (Array.isArray(item)) {
            item.forEach(value => result.push(value));
        }
        else {
            result.push(item);
        }
    });
    return result.join("");
}

function datediff(date1, date2) {
    return date2 - date1;
}

function year(date) {
    return date.getFullYear();
}

function month(date) {
    return date.getMonth();
}

function day(date) {
    return date.getDate();
}

function hours(date) {
    return date.getHours();
}

function minutes(date) {
    return date.getMinutes();
}

function seconds(date) {
    return date.getSeconds();
}

/**
 * Get the maximum value
 * examples:
 * 1. crsCollective.processors.max(1, 2, 3)         // standard arguments
 * 2. crsCollective.processors.max([1, 2, 3])       // parameters as an array of values
 * 3. crsCollective.processors.max([1, 2, 3], 4, 5) // combination of 1 and 2
 * @param values {numbers} values to compare
 * @returns {number} the largest number
 */
function max(...values) {
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
 * 1. crsCollective.processors.min(1, 2, 3)         // standard arguments
 * 2. crsCollective.processors.min([1, 2, 3])       // parameters as an array of values
 * 3. crsCollective.processors.min([1, 2, 3], 4, 5) // combination of 1 and 2
 * @param values {numbers} values to compare
 * @returns {number} the smallest number
 */
function min(...values) {
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

function abs(value) {
    return Math.abs(value);
}

function pow(base, expoonent) {
    return Math.pow(base, expoonent);
}

globalThis.crsCollective = globalThis.crsCollective || {
    RuleSet: BaseSet,

    filter: {
        create: () => new SerializableFilter()
    },

    validate: {
        StartsWithRule: StartsWithRule,
        EndsWithRule: EndsWithRule,
        EqualsRule: EqualsRule,
        NotEqualsRule: NotEqualsRule,
        ContainsRule: ContainsRule,
        GreaterThanRule: GreaterThanRule,
        LessThanRule: LessThanRule,
        BetweenRule: BetweenRule,
        OneOfRule: OneOfRule
    },

    update: {
        UpdateRuleSet: UpdateRuleSet,
        SetPropertyRule: SetPropertyRule,
        DeletePropertyRule: DeletePropertyRule
    },

    actions: {
        trim: trim,
        leftTrim: leftTrim,
        rightTrim: rightTrim,
        toUpperCase: toUpperCase,
        toLowerCase: toLowerCase,
        subString: subString,
        concat: concat,
        datediff: datediff,
        year: year,
        month: month,
        day: day,
        hour: hours,
        minutes: minutes,
        seconds: seconds,
        max: max,
        min: min,
        abs: abs,
        pow: pow
    }
};
