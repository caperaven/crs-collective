import {OneOfRule} from "../../src/validation/one-of-rule.js";
import {BaseSet} from "../../src/base/base-set.js";

test("OneOfRule - execute", () => {
    const instance = new OneOfRule({field: "value", value: ["a", "b", "c"]});
    expect(instance.execute({value: "a"})).toBeTruthy();
    expect(instance.execute({value: "d"})).toBeFalsy();
});

test("OneOfRule - code", () => {
    const instance = new OneOfRule({field: "value", value: ["a", "b", "c"]});

    const filter = new BaseSet([instance]);
    const fn = filter.toFunction({field: "value"});
    filter.dispose();

    expect(fn({value: "a"})).toBeTruthy();
    expect(fn({value: "d"})).toBeFalsy();
});