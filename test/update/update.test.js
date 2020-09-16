import {UpdateRuleSet} from "./../../src/update/update-rule-set.js";
import {SetPropertyRule} from "./../../src/update/set-property-rule.js";
import {DeletePropertyRule} from "./../../src/update/delete-property-rule.js";

test("Update - execute", () => {
    const data = [
        {
            id: 0,
            isActive: true
        },
        {
            id: 1,
            isActive: false
        }
    ];

    const ruleSet = new UpdateRuleSet([
        new SetPropertyRule({field: "inValid", value: true, condition: "model.isActive == false"})
    ]);

    ruleSet.execute(data);

    expect(data[0].inValid).toBeFalsy();
    expect(data[1].inValid).toBeTruthy();
})

test("Update - execute", () => {
    const data = [
        {
            id: 0,
            isActive: true,
            property: 1
        },
        {
            id: 1,
            isActive: false,
            property: 1
        }
    ];

    const ruleSet = new UpdateRuleSet([
        new DeletePropertyRule({field: "property", condition: "model.isActive == false"})
    ]);

    ruleSet.execute(data);

    expect(data[0].property).not.toBeUndefined();
    expect(data[1].property).toBeUndefined();
})