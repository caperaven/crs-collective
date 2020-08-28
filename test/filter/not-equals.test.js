import {NotEqualsRule} from "./../../src/filter/not-equals-rule.js";

test("NotEqualsRule - execute", () => {
    const instance = new NotEqualsRule({field: "value", value: "hellos"});
    expect(instance.execute({value: "hello"})).toBeTruthy();
    expect(instance.execute({value: "hellos"})).toBeFalsy();
});

test("NotEqualsRule - execute - index", () => {
    const instance = new NotEqualsRule({index: 1, value: "betas"});
    expect(instance.execute(["alpha", "beta", "gamma"])).toBeTruthy();
    expect(instance.execute(["alphas", "betas", "gammas"])).toBeFalsy();
});