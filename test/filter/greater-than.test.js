import {GreaterThanRule} from "../../src/validation/greater-than-rule.js";
import {BaseSet} from "../../src/base/base-set.js";

test("GreaterThanRule - execute", () => {
    const instance = new GreaterThanRule({field: "value", value: 2});
    expect(instance.execute({value: 3})).toBeTruthy();
    expect(instance.execute({value: 2})).toBeFalsy();
});

test("GreaterThanRule - execute - index", () => {
    const instance = new GreaterThanRule({index: 1, value: 2});
    expect(instance.execute([2, 3, 4])).toBeTruthy();
    expect(instance.execute([0, 1, 2])).toBeFalsy();
});

test("GreaterThanRule - code", () => {
    const instance = new GreaterThanRule({field: "value", value: 2});

    const filter = new BaseSet([instance]);
    const fn = filter.toFunction({field: "value"});
    filter.dispose();

    expect(fn({value: 3})).toBeTruthy();
    expect(fn({value: 2})).toBeFalsy();
});