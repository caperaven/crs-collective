import {StartsWithRule} from "./../validation/starts-with-rule.js";
import {EndsWithRule} from "./../validation/ends-with-rule.js";
import {EqualsRule} from "./../validation/equals-rule.js";
import {NotEqualsRule} from "./../validation/not-equals-rule.js";
import {ContainsRule} from "./../validation/contains-rule.js";
import {GreaterThanRule} from "./../validation/greater-than-rule.js";
import {LessThanRule} from "./../validation/less-than-rule.js";
import {BetweenRule} from "./../validation/between-rule.js";
import {OneOfRule} from "./../validation/one-of-rule.js";


export class SerializableFilter {
    constructor() {
        this.oneOffMap = new Map();
        this.betweenMap = new Map();
        this.lessThanMap = new Map();
        this.greaterThanMap = new Map();
        this.equalsMap = new Map();
        this.notEqualsMap = new Map();
        this.startsWithMap = new Map();
        this.endsWithMap = new Map();
        this.containsMap = new Map();

        this.onceOff = this.setMapValue.bind(this.oneOffMap);
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
        this.onceOff = null;
        this.between = null;
        this.lessThan = null;
        this.greaterThan = null;
        this.equals = null;
        this.startsWith = null;
        this.endsWith = null;
        this.contains = null;
        this.notEquals = null;

        let maps = [this.oneOffMap, this.betweenMap, this.lessThanMap, this.greaterThanMap, this.equalsMap, this.startsWithMap, this.endsWithMap, this.containsMap, this.notEqualsMap];
        for (let map of maps) {
            map.clear();
            map = null;
        };
        maps.length = 0;
    }

    setMapValue(field, ...values) {
        this.set(field, Object.assign(values));
    }

    toSchema() {
        const result = [];

        this.toArray("once-off", this.oneOffMap, result);
        this.toArray("between", this.betweenMap, result);
        this.toArray("less-than", this.lessThanMap, result);
        this.toArray("greater-than", this.greaterThanMap, result);
        this.toArray("equals", this.equalsMap, result);
        this.toArray("not-equals", this.notEqualsMap, result);
        this.toArray("starts-with", this.startsWithMap, result);
        this.toArray("ends-width", this.endsWithMap, result);
        this.toArray("contains", this.containsMap, result);

        return result;
    }

    fromSchema(schema) {
        const functions = {
            "once-off": this.onceOff,
            "between": this.between,
            "less-than": this.lessThan,
            "greater-than": this.greaterThan,
            "equals": this.equals,
            "not-equals": this.notEquals,
            "starts-with": this.startsWith,
            "ends-width": this.endsWith,
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
        let filter = new crsCollective.RuleSet();
        this.oneOffMap.forEach((value, key) => filter.push(new OneOfRule({field: key, value: value})));
        this.betweenMap.forEach((value, key) => filter.push(new BetweenRule({field: key, value: value})));
        this.lessThanMap.forEach((value, key) => filter.push(new LessThanRule({field: key, value: value})));
        this.greaterThanMap.forEach((value, key) => filter.push(new GreaterThanRule({field: key, value: value})));
        this.equalsMap.forEach((value, key) => filter.push(new EqualsRule({field: key, value: value})));
        this.notEqualsMap.forEach((value, key) => filter.push(new NotEqualsRule({field: key, value: value})));
        this.startsWithMap.forEach((value, key) => filter.push(new StartsWithRule({field: key, value: value})));
        this.endsWithMap.forEach((value, key) => filter.push(new EndsWithRule({field: key, value: value})));
        this.containsMap.forEach((value, key) => filter.push(new ContainsRule({field: key, value: value})));
        const result = filter.toFunction(options);
        filter.dispose();
        filter = null;
        return result;
    }
}