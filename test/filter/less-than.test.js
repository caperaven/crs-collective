import {LessThanRule} from "../../src/validation/less-than-rule.js";
import {BaseSet} from "../../src/base/base-set.js";

test("LessThanRule - execute", () => {
    const instance = new LessThanRule({field: "value", value: 4});
    expect(instance.execute({value: 3})).toBeTruthy();
    expect(instance.execute({value: 4})).toBeFalsy();
});

test("LessThanRule - execute - index", () => {
    const instance = new LessThanRule({index: 1, value: 4});
    expect(instance.execute([2, 3, 4])).toBeTruthy();
    expect(instance.execute([5, 4, 3])).toBeFalsy();
});

test("LessThanRule - code", () => {
    const instance = new LessThanRule({field: "value", value: 4});

    const filter = new BaseSet([instance]);
    const fn = filter.toFunction({field: "value"});
    filter.dispose();

    expect(fn({value: 3})).toBeTruthy();
    expect(fn({value: 4})).toBeFalsy();
});