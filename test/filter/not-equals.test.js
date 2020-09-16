import {NotEqualsRule} from "../../src/validation/not-equals-rule.js";
import {BaseSet} from "../../src/base/base-set.js";

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

test("NotEqualsRule - code", () => {
    const instance = new NotEqualsRule({field: "value", value: "hellos"});

    const filter = new BaseSet([instance]);
    const fn = filter.toFunction({field: "value"});
    filter.dispose();

    expect(fn({value: "hello"})).toBeTruthy();
    expect(fn({value: "hellos"})).toBeFalsy();
});