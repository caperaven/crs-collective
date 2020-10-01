import {SerializableFilter} from "./../../src/factory/serializable-filter.js";
import {getData} from "./data-factory.js";

let data;

beforeEach(() => {
    data = getData(10);
})

test("scenario - simple number - between", () => {
    const filter = new SerializableFilter();

    filter.between("number", 10, 20);
    const fn = filter.toFunction({number: "number"});
    const result = data.filter(item => fn(item));

    expect(result.length).toEqual(1);
})

test("scenario - simple string - equals", () => {
    const filter = new SerializableFilter();

    filter.equals("code", "code 1");
    const fn = filter.toFunction();
    const result = data.filter(item => fn(item));

    expect(result.length).toEqual(1);
})

test("scenario - simple string - not equals", () => {
    const filter = new SerializableFilter();

    filter.notEquals("code", "code 1");
    filter.greaterThan("number", 100)
    const fn = filter.toFunction();
    const result = data.filter(item => fn(item));

    expect(result.length).toEqual(2);
})
