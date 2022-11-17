// From: https://dev.to/gcanti/functional-design-smart-constructors-14nb

// THE PROBLEM

import {map, none, Option, some} from "fp-ts/Option";
import {option} from "fp-ts";

interface Person {
    name: string
    age: number
}

function UNSAFEpersonConstructor(name: string, age: number): Person {
    return { name, age }
}

const p = person('', -1.2) // ❌ no error is thrown

// THE SOLUTION

// 1. define a type R which represents the refinement
// 2. do not export a constructor for R
// 3. do export a function (the smart constructor) with the following signature
// makeR: (t: T) => Option<R>

// General branded type
// type BrandedT = T & Brand

export interface NonEmptyStringBrand {
    readonly NonEmptyString: unique symbol // ensures uniqueness across modules / packages
}

export type NonEmptyString = string & NonEmptyStringBrand

// runtime check implemented as a custom type guard
function isNonEmptyString(s: string): s is NonEmptyString {
    return s.length > 0
}

export function makeNonEmptyString(s: string): Option<NonEmptyString> {
    return isNonEmptyString(s) ? some(s) : none
}

export interface IntBrand {
    readonly Int: unique symbol
}

export type Int = number & IntBrand

function isInt(n: number): n is Int {
    return Number.isInteger(n) && n >= 0
}

export function makeInt(n: number): Option<Int> {
    return isInt(n) ? some(n) : none
}

function person(name: NonEmptyString, age: Int): Person {
    return { name, age }
}

// person('', -1.2) // static error


const goodName = makeNonEmptyString('Giulio')
const badName = makeNonEmptyString('')
const goodAge = makeInt(45)
const badAge = makeInt(-1.2)

// API is wrong, but the idea comes through
option.chain(goodName, name => option.map(goodAge, age => person(name, age))) // some({ "name": "Giulio", "age": 45 })

option.chain(badName, name => option.map(goodAge, age => person(name, age))) // none

option.chain(goodName, name => option.map(badAge, age => person(name, age))) // none
