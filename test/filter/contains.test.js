import {ContainsRule} from "../../src/validation/contains-rule.js";
import {BetweenRule} from "../../src/validation/between-rule.js";
import {BaseSet} from "../../src/base/base-set.js";

test("BetweenRule - execute", () => {
    const instance = new ContainsRule({field: "value", value: "s"});

    expect(instance.execute({value: "Test"})).toBeTruthy();
    expect(instance.execute({value: "Woot"})).toBeFalsy();
});

test("BetweenRule - execute - index", () => {
    let isValid;
    const i1 = new ContainsRule({index: 0, value: "A"});
    isValid = i1.execute(["Alpha", "Beta", "Charley"]);
    expect(isValid).toBeTruthy();

    const i2 = new ContainsRule({index: 0, value: "S"});
    expect(i2.execute(["Alpha", "Beta", "Charley"])).toBeFalsy();
});

test("BetweenRule - code", () => {
    const instance = new ContainsRule({field: "value", value: "s"});

    const filter = new BaseSet([instance]);
    const fn = filter.toFunction({field: "value"});
    filter.dispose();

    expect(fn({value: "Test"})).toBeTruthy();
    expect(fn({value: "Woot"})).toBeFalsy();
});