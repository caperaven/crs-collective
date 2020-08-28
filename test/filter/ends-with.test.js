import {EndsWithRule} from "./../../src/filter/ends-with-rule.js";

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