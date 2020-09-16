import {StartsWithRule} from "../../src/validation/starts-with-rule.js";
import {BaseSet} from "../../src/base/base-set.js";

test("StartsWithRule - execute", () => {
    const instance = new StartsWithRule({field: "value", value: "h"});
    expect(instance.execute({value: "hello"})).toBeTruthy();
    expect(instance.execute({value: "1 hello"})).toBeFalsy();
});

test("StartsWithRule - execute - index", () => {
    const instance = new StartsWithRule({index: 1, value: "b"});
    expect(instance.execute(["alpha", "beta", "gamma"])).toBeTruthy();
    expect(instance.execute(["alpha", "gamma", "beta"])).toBeFalsy();
});

test("StartsWithRule - code", () => {
    const instance = new StartsWithRule({field: "value", value: "h"});

    const filter = new BaseSet([instance]);
    const fn = filter.toFunction({field: "value"});
    filter.dispose();

    expect(fn({value: "hello"})).toBeTruthy();
    expect(fn({value: "1 hello"})).toBeFalsy();
});