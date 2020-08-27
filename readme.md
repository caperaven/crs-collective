# CRS Collective

## Introduction

Manage arrays through a collective of rule sets to perform actions on a array of data.  
A collective is a group that works together for a common goal.  

This tries to do the same through rule sets that work on a collection of data for a common goal.

Common actions you can use this library for include:

1. Filtering data using rule sets
1. Performing updates on an array of values

## API

The core API is exposed in `/src/index.js`.   
This allows for easy bundle of the packages so that it can be used in web workers or directly on page.  
The entry point point for using the library is `globalThis.crsCollective`.  
More often than not you don't need to define the `globalThis` so you can also just use `crsCollective`. 

## Rules

Rules are the smallest standalone executable that performs an action or checks a condition.  
In the API you rules are grouped under their respective types:

1. validation
1. update

Rules can be used individually or as a set.  
All rules should have a `execute` function and a result of type boolean indicating the success of the rule.

Common rules packaged by default are:

### Validate Rules

1. crsCollective.validate.StartsWithRule
1. crsCollective.validate.EndsWithRule
1. crsCollective.validate.EqualsRule
1. crsCollective.validate.NotEqualsRule
1. crsCollective.validate.ContainsRule
1. crsCollective.validate.GreaterThanRule
1. crsCollective.validate.LessThanRule
1. crsCollective.validate.BetweenRule
1. crsCollective.validate.OneOfRule

These rules are used to validate an object's values and use as part of a array filter process

### Update Rules

1. crsCollective.update.SetPropertyRule
1. crsCollective.update.DeletePropertyRule

These rules are used to update the values of fields in an array

### Using rules

you can easily construct a rule 
```js
new crsCollective.validate.OneOfRule({field: "code", value: ["A", "B"]})
```

Note how you pass in a object literal to the constructor.  
You must take care that you define all the required properties that the rule requires to operate.  
The two properties that most always are required are:

1. field
1. value

## Sets 

Sets are a collection of rules.  
Sets also have `execute` functions and also return either true or false.  
The set will execute each rule and as soon as a rule fails, the set will also fail.  
If you don't want this behaviour create a new class based on BaseSet and override the execute function.

Set's execute one item at a time.  

There are two ways you can add rules to sets.

1. As a parameter on the `constructor`.
1. Using the set's `add` function.

## Updating values

Changing values in the array is done by the updates section of crsCollective.  
`SetPropertyRule` and `DeletePropertyRule` assumes that the collection is a array of objects.
To do batch updates you must use a instance of `UpdateRuleSet`.

The execute function on `UpdateRuleSet` takes a array as the parameter.

 
