import {BetweenRule} from "../../src/validation/between-rule.js";
import {BaseSet} from "./../../src/base/base-set.js";

test("BetweenRule - execute", () => {
    const instance = new BetweenRule({field: "value", minValue: 1, maxValue: 3});

    const isValid = [];
    isValid.push(instance.execute({value: 0}));
    isValid.push(instance.execute({value: 1}));
    isValid.push(instance.execute({value: 2}));
    isValid.push(instance.execute({value: 3}));
    isValid.push(instance.execute({value: 4}));

    expect(isValid[0]).toBeFalsy();
    expect(isValid[1]).toBeTruthy();
    expect(isValid[2]).toBeTruthy();
    expect(isValid[3]).toBeTruthy();
    expect(isValid[4]).toBeFalsy();
});

test("BetweenRule - execute - index", () => {
    const instance = new BetweenRule({index: 1, minValue: 1, maxValue: 3});
    expect(instance.execute([0, 2, 3])).toBeTruthy();
    expect(instance.execute([4, 5, 6])).toBeFalsy();
});

test("BetweenRule - code", () => {
    const instance = new BetweenRule({field: "value", minValue: 1, maxValue: 3});
    const filter = new BaseSet([instance]);
    const fn = filter.toFunction({field: "value"});
    filter.dispose();

    const isValid = [];
    isValid.push(fn({value: 0}));
    isValid.push(fn({value: 1}));
    isValid.push(fn({value: 2}));
    isValid.push(fn({value: 3}));
    isValid.push(fn({value: 4}));

    expect(isValid[0]).toBeFalsy();
    expect(isValid[1]).toBeTruthy();
    expect(isValid[2]).toBeTruthy();
    expect(isValid[3]).toBeTruthy();
    expect(isValid[4]).toBeFalsy();
})