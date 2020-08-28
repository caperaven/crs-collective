import {OneOfRule} from "./../../src/filter/one-of-rule.js";

test("OneOfRule - execute", () => {
    const instance = new OneOfRule({field: "value", value: "a"});
    expect(instance.execute({value: ["a", "b", "c"]})).toBeTruthy();
    expect(instance.execute({value: ["b", "c", "d"]})).toBeFalsy();
});

test("OneOfRule - execute - index", () => {
    const instance = new OneOfRule({index: 1, value: "e"});
    expect(instance.execute([["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]])).toBeTruthy();
    expect(instance.execute([["a", "b", "c"], ["g", "h", "i"] , ["d", "e", "f"]])).toBeFalsy();
});