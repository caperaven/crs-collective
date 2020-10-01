import {StartsWithRule} from "./../validation/starts-with-rule.js";
import {EndsWithRule} from "./../validation/ends-with-rule.js";
import {EqualsRule} from "./../validation/equals-rule.js";
import {NotEqualsRule} from "./../validation/not-equals-rule.js";
import {ContainsRule} from "./../validation/contains-rule.js";
import {GreaterThanRule} from "./../validation/greater-than-rule.js";
import {LessThanRule} from "./../validation/less-than-rule.js";
import {BetweenRule} from "./../validation/between-rule.js";
import {OneOfRule} from "./../validation/one-of-rule.js";
import {BaseSet} from "./../base/base-set.js";


export class SerializableFilter {
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
            result = result[0]
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
        }

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