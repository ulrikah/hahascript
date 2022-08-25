import {none, Option, some} from "fp-ts/Option";


function findIndex<A>(
    as: Array<A>,
    predicate: (a: A) => boolean
): Option<number> {
    const index = as.findIndex(predicate)
    return index === -1 ? none : some(index)
}


const array = ["A", "AA", "AAA"]
console.log(
    findIndex(array, (element) => element.length > 1)
)
