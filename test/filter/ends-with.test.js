import {EndsWithRule} from "../../src/validation/ends-with-rule.js";
import {BaseSet} from "../../src/base/base-set.js";

test("EndsWithRule - execute", () => {
    const instance = new EndsWithRule({field: "value", value: "o"});
    expect(instance.execute({value: "hello"})).toBeTruthy();
    expect(instance.execute({value: "hello world"})).toBeFalsy();
});

test("EndsWithRule - execute - index", () => {
    const instance = new EndsWithRule({index: 1, value: "a"});
    expect(instance.execute(["alpha", "beta", "gamma"])).toBeTruthy();
    expect(instance.execute(["alphas", "betas", "gammas"])).toBeFalsy();
});

test("EndsWithRule - code", () => {
    const instance = new EndsWithRule({field: "value", value: "o"});

    const filter = new BaseSet([instance]);
    const fn = filter.toFunction({field: "value"});
    filter.dispose();

    expect(fn({value: "hello"})).toBeTruthy();
    expect(fn({value: "hello world"})).toBeFalsy();
});