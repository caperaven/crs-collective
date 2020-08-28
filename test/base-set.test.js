import {BaseSet} from "./../src/base/base-set.js";
import {EqualsRule} from "./../src/filter/equals-rule.js";

test("BaseSet - execute - filter example", () => {
    const set = new BaseSet([new EqualsRule({field: "isActive", value: true})]);
    const data = [
        {
            code: "Item 1",
            isActive: true
        },
        {
            code: "Item 2",
            isActive: false
        },
        {
            code: "Item 3",
            isActive: true
        }
    ];

    const result = data.filter(item => set.execute(item));
    expect(result.length).toEqual(2);
    expect(result[0].code).toEqual("Item 1");
    expect(result[1].code).toEqual("Item 3");
});