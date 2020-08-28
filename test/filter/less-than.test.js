import {LessThanRule} from "./../../src/filter/less-than-rule.js";

test("LessThanRule - execute", () => {
    const instance = new LessThanRule({field: "value", value: 4});
    expect(instance.execute({value: 3})).toBeTruthy();
    expect(instance.execute({value: 4})).toBeFalsy();
});

test("LessThanRule - execute - index", () => {
    const instance = new LessThanRule({index: 1, value: 4});
    expect(instance.execute([2, 3, 4])).toBeTruthy();
    expect(instance.execute([5, 4, 3])).toBeFalsy();
});