export class SerializableFilter {
    constructor() {
        this.oneOffMap = new Map();
        this.betweenMap = new Map();
        this.lessThanMap = new Map();
        this.greaterThanMap = new Map();
        this.equalsMap = new Map();
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
    }

    dispose() {
        this.onceOff = this.setMapValue.bind(this.oneOffMap);
        this.between = this.setMapValue.bind(this.betweenMap);
        this.lessThan = this.setMapValue.bind(this.lessThanMap);
        this.greaterThan = this.setMapValue.bind(this.greaterThanMap);
        this.equals = this.setMapValue.bind(this.equalsMap);
        this.startsWith = this.setMapValue.bind(this.startsWithMap);
        this.endsWith = this.setMapValue.bind(this.endsWithMap);
        this.contains = this.setMapValue.bind(this.containsMap);

        this.oneOffMap.clear();
        this.betweenMap.clear();
        this.lessThanMap.clear();
        this.greaterThanMap.clear();
        this.equalsMap.clear();
        this.startsWithMap.clear();
        this.endsWithMap.clear();
        this.containsMap.clear();
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
        this.toArray("starts-with", this.startsWithMap, result);
        this.toArray("ends-width", this.endsWithMap, result);
        this.toArray("contains", this.containsMap, result);

        return result;
    }

    toArray(rule, map, array) {
        map.forEach((value, key) => array.push({
            "rule": rule,
            "field": key,
            "value": value
        }));
    }
}