import {BaseSet} from "./base/base-set.js";
import {StartsWithRule} from "./validation/starts-with-rule.js";
import {EndsWithRule} from "./validation/ends-with-rule.js";
import {EqualsRule} from "./validation/equals-rule.js";
import {NotEqualsRule} from "./validation/not-equals-rule.js";
import {ContainsRule} from "./validation/contains-rule.js";
import {GreaterThanRule} from "./validation/greater-than-rule.js";
import {LessThanRule} from "./validation/less-than-rule.js";
import {BetweenRule} from "./validation/between-rule.js";
import {OneOfRule} from "./validation/one-of-rule.js";
import {SetPropertyRule} from "./update/set-property-rule.js"
import {DeletePropertyRule} from "./update/delete-property-rule.js";
import {UpdateRuleSet} from "./update/update-rule-set.js";
import {trim, leftTrim, rightTrim, toUpperCase, toLowerCase, subString, concat, datediff,
    year, month, day, hours, minutes, seconds, max, min, abs, pow} from "./processors/actions.js";

globalThis.crsCollective = globalThis.crsCollective || {
    RuleSet: BaseSet,
    validate: {
        StartsWithRule: StartsWithRule,
        EndsWithRule: EndsWithRule,
        EqualsRule: EqualsRule,
        NotEqualsRule: NotEqualsRule,
        ContainsRule: ContainsRule,
        GreaterThanRule: GreaterThanRule,
        LessThanRule: LessThanRule,
        BetweenRule: BetweenRule,
        OneOfRule: OneOfRule
    },

    update: {
        UpdateRuleSet: UpdateRuleSet,
        SetPropertyRule: SetPropertyRule,
        DeletePropertyRule: DeletePropertyRule
    },

    actions: {
        trim: trim,
        leftTrim: leftTrim,
        rightTrim: rightTrim,
        toUpperCase: toUpperCase,
        toLowerCase: toLowerCase,
        subString: subString,
        concat: concat,
        datediff: datediff,
        year: year,
        month: month,
        day: day,
        hour: hours,
        minutes: minutes,
        seconds: seconds,
        max: max,
        min: min,
        abs: abs,
        pow: pow
    }
};