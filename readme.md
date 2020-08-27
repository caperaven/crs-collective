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

1. filter
1. update

Rules can be used individually or as a set.  
All rules should have a `execute` function and a result of type boolean indicating the success of the rule.

Common rules packaged by default are:

### Filter Rules

1. crsCollective.filter.StartsWithRule
1. crsCollective.filter.EndsWithRule
1. crsCollective.filter.EqualsRule
1. crsCollective.filter.NotEqualsRule
1. crsCollective.filter.ContainsRule
1. crsCollective.filter.GreaterThanRule
1. crsCollective.filter.LessThanRule
1. crsCollective.filter.BetweenRule
1. crsCollective.filter.OneOfRule

### Update Rules

1. crsCollective.update.SetValueRule

you can easily construct a rule 
```js
new crsCollective.filters.OneOfRule({field: "code", value: ["A", "B"]})
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
