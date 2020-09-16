import {EqualsRule} from "../../src/validation/equals-rule.js";
import {BaseSet} from "../../src/base/base-set.js";

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

test("EqualsRule - code", () => {
    const instance = new EqualsRule({field: "value", value: "hello"});

    const filter = new BaseSet([instance]);
    const fn = filter.toFunction({field: "value"});
    filter.dispose();

    expect(fn({value: "hello"})).toBeTruthy();
    expect(fn({value: "hellos"})).toBeFalsy();
});