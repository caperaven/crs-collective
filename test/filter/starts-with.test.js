import {StartsWithRule} from "./../../src/filter/starts-with-rule.js";

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