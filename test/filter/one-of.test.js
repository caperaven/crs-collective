import {OneOfRule} from "../../src/validation/one-of-rule.js";
import {BaseSet} from "../../src/base/base-set.js";

test("OneOfRule - execute", () => {
    const instance = new OneOfRule({field: "value", value: ["a", "b", "c"]});
    expect(instance.execute({value: "a"})).toBeTruthy();
    expect(instance.execute({value: "d"})).toBeFalsy();
});

test("OneOfRule - execute - index", () => {
    const instance = new OneOfRule({index: 1, value: "e"});
    expect(instance.execute([["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]])).toBeTruthy();
    expect(instance.execute([["a", "b", "c"], ["g", "h", "i"] , ["d", "e", "f"]])).toBeFalsy();
});

test("OneOfRule - code", () => {
    const instance = new OneOfRule({field: "value", value: "a"});

    const filter = new BaseSet([instance]);
    const fn = filter.toFunction({field: "value"});
    filter.dispose();

    expect(fn({value: ["a", "b", "c"]})).toBeTruthy();
    expect(fn({value: ["b", "c", "d"]})).toBeFalsy();
});