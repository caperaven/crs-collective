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
`SetPropertyRule` and `DeletePropertyRule` assumes that the collection is an array of objects.
To do batch updates you must use a instance of `UpdateRuleSet`.

The execute function on `UpdateRuleSet` takes a array as the parameter.

## toFunction

The nice thing about these rule sets are that they are dynamic, you can easily add, remove and event order the rules as you need.  
The downside is that they take up a bit of memory and execution time is not as fast as a static function.  
When processing large arrays performance and memory footprint is important.  
This is where the set's toFunction function comes in.  

This will condense the structure of all the rules into a single function.  
Once you have this function you can dispose of the set using it's `dispose` function.

Here is a use case example.

```js
// 1. Get the data
const data = [
    { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 },{ value: 5 }
]

// 2. Set up a ruleset to be used for filtering
const filter = new crsCollective.RuleSet([
    new crsCollective.validate.GreaterThanRule({field: "value", value: 2})
]);

// 3. Get a filter function from the rule set
const fn = filter.toFunction({field: "value"});

// 4. Dispose of the rule set
filter.dispose();

// 5. Filter the data.
const result = data.filter(item => fn(item));
console.log(result);
```

The advantage of the static function is that it takes up much less memory and performs faster.  
It is however static and if the rules change will need to be re-generated.

This only applies to evaluation rule sets and not update rule sets.

## Actions

This library ships with a set of utility functions

1. trim
1. leftTrim
1. rightTrim
1. toUpperCase
1. toLowerCase
1. subString
1. concat
1. datediff
1. year
1. month
1. day
1. hour
1. minutes
1. seconds
1. max
1. min
1. abs
1. pow

For examples on how to use these utility functions see [the tests](https://github.com/caperaven/crs-collective/blob/master/test/processors/actions.test.js)

## Schema

Often you want to have filters run on web workers to get it off of the main thread.  
The problem is that you can't send complex objects over thread boundaries, but you can send json.

CRS Collective has a simplified filter class that you can use to define filters and then save that filter to a schema.

```js
const filter = crsCollective.filter.create();
filter.oneOf("siteCode", ["A11", "A12"]);
filter.oneOf("locationCode", ["JB", "CPT"]);

filter.between("numberValue", 10, 20);
filter.lessThan("numberValue", 15);
filter.greaterThan("number", 5);
filter.equals("date", Date.now());
filter.startsWith("siteCode", "A");
filter.endsWith("siteCode", "B");
filter.contains("siteCode", "12")

const schema = filter.toSchema();
document.documentElement.innerHTML = JSON.stringify(schema);
```

You can also load the schema using `fromSchema(json)`, and create a filter function using `toFunction`