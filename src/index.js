import {BaseSet} from "./base/base-set.js";
import {StartsWithRule} from "./filter/starts-with-rule.js";
import {EndsWithRule} from "./filter/ends-with-rule.js";
import {EqualsRule} from "./filter/equals-rule.js";
import {NotEqualsRule} from "./filter/not-equals-rule.js";
import {ContainsRule} from "./filter/contains-rule.js";
import {GreaterThanRule} from "./filter/greater-than-rule.js";
import {LessThanRule} from "./filter/less-than-rule.js";
import {BetweenRule} from "./filter/between-rule.js";
import {OneOfRule} from "./filter/one-of-rule.js";
import {SetPropertyRule} from "./update/set-property-rule.js"
import {DeletePropertyRule} from "./update/delete-property-rule.js";
import {UpdateRuleSet} from "./update/update-rule-set.js";

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
    }
};