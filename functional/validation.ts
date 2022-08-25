import {chain, Either, getApplicativeValidation, left, map, mapLeft, right} from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import {getSemigroup, NonEmptyArray} from "fp-ts/NonEmptyArray";
import {sequenceT} from "fp-ts/Apply";
import {Semigroup} from "fp-ts/Semigroup";

const minLength = (s: string): Either<string, string> =>
    s.length >= 6 ? right(s) : left('at least 6 characters')

const oneCapital = (s: string): Either<string, string> =>
    /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')

const oneNumber = (s: string): Either<string, string> =>
    /[0-9]/g.test(s) ? right(s) : left('at least one number')

const validatePasswordWithEither = (s: string): Either<string, string> =>
    pipe(
        minLength(s),
        chain(oneCapital),
        chain(oneNumber)
    )

console.log(validatePasswordWithEither("asd"))

// Constructing a validator from a sequence of Either-returning functions
function lift<E, A>(check: (a: A) => Either<E, A>): (a: A) => Either<NonEmptyArray<E>, A> {
    return a => pipe(
        check(a),
        mapLeft(a => [a])
    )
}

const minLengthValidator = lift(minLength)
const oneCapitalValidator = lift(oneCapital)
const oneNumberValidator = lift(oneNumber)


function semigroupArray<A>(): Semigroup<NonEmptyArray<A>> {
    return {
        concat: (x, y) => x.concat(y) as NonEmptyArray<A>
    }
}

const validatePasswordValidator = (s: string): Either<NonEmptyArray<string>, string> =>
    pipe(
        sequenceT(getApplicativeValidation(semigroupArray<string>()))(
            minLengthValidator(s),
            oneCapitalValidator(s),
            oneNumberValidator(s)
        ),
        map(() => s)
    )

console.log(validatePasswordValidator("asd"))

