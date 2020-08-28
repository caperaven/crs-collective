import {GreaterThanRule} from "./../../src/filter/greater-than-rule.js";

test("GreaterThanRule - execute", () => {
    const instance = new GreaterThanRule({field: "value", value: 2});
    expect(instance.execute({value: 3})).toBeTruthy();
    expect(instance.execute({value: 2})).toBeFalsy();
});

test("GreaterThanRule - execute - index", () => {
    const instance = new GreaterThanRule({index: 1, value: 2});
    expect(instance.execute([2, 3, 4])).toBeTruthy();
    expect(instance.execute([0, 1, 2])).toBeFalsy();
});