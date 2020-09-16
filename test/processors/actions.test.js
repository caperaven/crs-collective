import {
    trim, leftTrim, rightTrim, toUpperCase, toLowerCase, subString, concat,
    datediff, year, month, day, hours, minutes, seconds,
    max, min, abs, pow} from "./../../src/processors/actions.js";

test("actions - trim", () => {
    expect(trim("   a   ")).toEqual("a");
    expect(trim(123)).toEqual(123);
})

test("actions - leftTrim", () => {
    expect(leftTrim("   a   ")).toEqual("a   ");
    expect(leftTrim(123)).toEqual(123);
})

test("actions - rightTrim", () => {
    expect(rightTrim("   a   ")).toEqual("   a");
    expect(rightTrim(123)).toEqual(123);
})

test("actions - toUpperCase", () => {
    expect(toUpperCase("a")).toEqual("A");
    expect(toUpperCase(123)).toEqual(123);
})

test("actions - toLowerCase", () => {
    expect(toLowerCase("A")).toEqual("a");
    expect(toLowerCase(123)).toEqual(123);
})

test("actions - subString", () => {
    expect(subString("Hello World", 0, 5)).toEqual("Hello");
    expect(subString(123)).toEqual(123);
})

test("actions - concat", () => {
    expect(concat("a", "b", "c")).toEqual("abc");
    expect(concat(["hello", "world"], "1")).toEqual("helloworld1");
    expect(concat(["hello", "world"], ["2"])).toEqual("helloworld2");
})

test("actions - year", () => {
    const date = new Date('Jan 25, 2020 23:15:30');
    expect(year(date)).toEqual(2020);
})

test("actions - month", () => {
    const date = new Date('Jan 25, 2020 23:15:30');
    expect(month(date)).toEqual(0);
})

test("actions - day", () => {
    const date = new Date('Jan 25, 2020 23:15:30');
    expect(day(date)).toEqual(25);
})

test("actions - hours", () => {
    const date = new Date('Jan 25, 2020 23:15:30');
    expect(hours(date)).toEqual(23);
})

test("actions - minutes", () => {
    const date = new Date('Jan 25, 2020 23:15:30');
    expect(minutes(date)).toEqual(15);
})

test("actions - seconds", () => {
    const date = new Date('Jan 25, 2020 23:15:30');
    expect(seconds(date)).toEqual(30);
})

test("actions - min", () => {
    expect(min(1, 2, 3)).toEqual(1);
    expect(min([1, 2, 3], -1)).toEqual(-1);
    expect(min([1, 2, 3], [-1, -2, -3])).toEqual(-3);
})

test("actions - max", () => {
    expect(max(1, 2, 3)).toEqual(3);
    expect(max([1, 2, 3], 4)).toEqual(4);
    expect(max([1, 2, 3], [4, 5, 6])).toEqual(6);
})

test("actions - pow", () => {
    expect(abs(10.123)).toEqual(Math.abs(10.123))
})

test("actions - pow", () => {
    expect(pow(10.123, 2)).toEqual(Math.pow(10.123, 2))
})