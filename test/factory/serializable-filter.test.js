import {SerializableFilter} from "./../../src/factory/serializable-filter.js";

let filter;
let date;

beforeEach(() => {
    date = Date.now();
    filter = new SerializableFilter();
})

function assertSchemaItem(item, rule, field, value) {
    expect(item).not.toBeNull();
    expect(item.rule).toEqual(rule);
    expect(item.field).toEqual(field);
    expect(item.value).toEqual(value);
}

function populateFilter() {
    filter.oneOf("siteCode", ["A11", "A12"]);
    filter.between("numberValue", 10, 20);
    filter.lessThan("numberValue", 15);
    filter.greaterThan("number", 5);
    filter.equals("date", date);
    filter.notEquals("numberValue", 10);
    filter.startsWith("siteCode", "A");
    filter.endsWith("siteCode", "B");
    filter.contains("siteCode", "12")
    filter.contains("subOjb.siteCode", "12");
}

function validateMapValue(map, field, value) {
    const entry = map.get(field);
    expect(entry).toEqual(value);
}

test("serializable - toSchema", () => {
    populateFilter();

    const schema = filter.toSchema();
    expect(schema.length).toEqual(10);

    assertSchemaItem(schema[0], "one-of", "siteCode", ["A11", "A12"]);
    assertSchemaItem(schema[1], "between", "numberValue", [10, 20]);
    assertSchemaItem(schema[2], "less-than", "numberValue", 15);
    assertSchemaItem(schema[3], "greater-than", "number", 5);
    assertSchemaItem(schema[4], "equals", "date", date);
    assertSchemaItem(schema[5], "not-equals", "numberValue", 10);
    assertSchemaItem(schema[6], "starts-with", "siteCode", "A");
    assertSchemaItem(schema[7], "ends-with", "siteCode", "B");
    assertSchemaItem(schema[8], "contains", "siteCode", "12");
    assertSchemaItem(schema[9], "contains", "subOjb.siteCode", "12");

    validateMapValue(filter.oneOfMap, "siteCode", ["A11", "A12"]);
    validateMapValue(filter.betweenMap, "numberValue", [10, 20]);
    validateMapValue(filter.lessThanMap, "numberValue", 15);
    validateMapValue(filter.greaterThanMap, "number", 5);
    validateMapValue(filter.equalsMap, "date", date);
    validateMapValue(filter.startsWithMap, "siteCode", "A");
    validateMapValue(filter.endsWithMap, "siteCode", "B");
    validateMapValue(filter.containsMap, "siteCode", "12");
    validateMapValue(filter.containsMap, "subOjb.siteCode", "12");
    validateMapValue(filter.notEqualsMap, "numberValue", 10);
})

test("serializable - fromSchema", () => {
    populateFilter();

    const schema = filter.toSchema();
    const loadFilter = new SerializableFilter();
    loadFilter.fromSchema(schema);

    validateMapValue(filter.oneOfMap, "siteCode", ["A11", "A12"]);
    validateMapValue(filter.betweenMap, "numberValue", [10, 20]);
    validateMapValue(filter.lessThanMap, "numberValue", 15);
    validateMapValue(filter.greaterThanMap, "number", 5);
    validateMapValue(filter.equalsMap, "date", date);
    validateMapValue(filter.startsWithMap, "siteCode", "A");
    validateMapValue(filter.endsWithMap, "siteCode", "B");
    validateMapValue(filter.containsMap, "siteCode", "12");
    validateMapValue(filter.containsMap, "subOjb.siteCode", "12");
    validateMapValue(filter.notEqualsMap, "numberValue", 10);
})

test("serializable - toFunction", () => {
    populateFilter();
    const fn = filter.toFunction({numberValue: "number", date: "date"});
    expect(fn).not.toBeNull();
    expect(fn).not.toBeUndefined();
})

test("serializable - clear", () => {
    populateFilter();
    const maps = [filter.oneOfMap, filter.betweenMap, filter.lessThanMap, filter.greaterThanMap, filter.equalsMap, filter.startsWithMap, filter.endsWithMap, filter.containsMap];

    for (let map of maps) {
        expect(map.size).toBeGreaterThan(0);
    }

    filter.clear();

    for(let map of maps) {
        expect(map.size).toEqual(0);
    }
})

test("serializable - dispose", () => {
    populateFilter();
    filter.dispose();

    expect(filter.oneOf).toBeNull();
    expect(filter.between).toBeNull();
    expect(filter.lessThan).toBeNull();
    expect(filter.greaterThan).toBeNull();
    expect(filter.equals).toBeNull();
    expect(filter.notEquals).toBeNull();
    expect(filter.startsWith).toBeNull();
    expect(filter.endsWith).toBeNull();
    expect(filter.contains).toBeNull();

    expect(filter.oneOfMap).toBeNull();
    expect(filter.betweenMap).toBeNull();
    expect(filter.lessThanMap).toBeNull();
    expect(filter.greaterThanMap).toBeNull();
    expect(filter.equalsMap).toBeNull();
    expect(filter.notEqualsMap).toBeNull();
    expect(filter.startsWithMap).toBeNull();
    expect(filter.endsWithMap).toBeNull();
    expect(filter.containsMap).toBeNull();
})
