import {EqualsRule} from "./../../src/filter/equals-rule.js";

test("EqualsRule - execute", () => {
    const instance = new EqualsRule({field: "value", value: "hello"});
    expect(instance.execute({value: "hello"})).toBeTruthy();
    expect(instance.execute({value: "hellos"})).toBeFalsy();
});

test("EqualsRule - execute - index", () => {
    const instance = new EqualsRule({index: 1, value: "beta"});
    expect(instance.execute(["alpha", "beta", "gamma"])).toBeTruthy();
    expect(instance.execute(["alphas", "betas", "gammas"])).toBeFalsy();
});