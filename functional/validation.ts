import {chain, Either, left, right} from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'


const minLength = (s: string): Either<string, string> =>
    s.length >= 6 ? right(s) : left('at least 6 characters')

const oneCapital = (s: string): Either<string, string> =>
    /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')

const oneNumber = (s: string): Either<string, string> =>
    /[0-9]/g.test(s) ? right(s) : left('at least one number')

const validatePassword = (s: string): Either<string, string> =>
    pipe(
        minLength(s),
        chain(oneCapital),
        chain(oneNumber)
    )

console.log(validatePassword("asdasdAsd5"))
