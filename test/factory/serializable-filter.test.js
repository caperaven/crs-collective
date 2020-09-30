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
    expect(schema.length).toEqual(9);

    assertSchemaItem(schema[0], "one-off", "siteCode", ["A11", "A12"]);
    assertSchemaItem(schema[1], "between", "numberValue", [10, 20]);
    assertSchemaItem(schema[2], "less-than", "numberValue", 15);
    assertSchemaItem(schema[3], "greater-than", "number", 5);
    assertSchemaItem(schema[4], "equals", "date", date);
    assertSchemaItem(schema[5], "starts-with", "siteCode", "A");
    assertSchemaItem(schema[6], "ends-with", "siteCode", "B");
    assertSchemaItem(schema[7], "contains", "siteCode", "12");
    assertSchemaItem(schema[8], "contains", "subOjb.siteCode", "12");

    validateMapValue(filter.oneOfMap, "siteCode", ["A11", "A12"]);
    validateMapValue(filter.betweenMap, "numberValue", [10, 20]);
    validateMapValue(filter.lessThanMap, "numberValue", 15);
    validateMapValue(filter.greaterThanMap, "number", 5);
    validateMapValue(filter.equalsMap, "date", date);
    validateMapValue(filter.startsWithMap, "siteCode", "A");
    validateMapValue(filter.endsWithMap, "siteCode", "B");
    validateMapValue(filter.containsMap, "siteCode", "12");
    validateMapValue(filter.containsMap, "subOjb.siteCode", "12");
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
})

test("serializable - toFunction", () => {
    populateFilter();
    const fn = filter.toFunction({numberValue: "number", date: "date"});
    expect(fn).not.toBeNull();
    expect(fn).not.toBeUndefined();
})

