// From: https://www.zhenghao.io/posts/ts-never

function unknownColor(x: never): never {
    throw new Error("unknown color");
}

type Color = 'red' | 'green' | 'blue'

function getColorName(c: Color): string | never {
    switch(c) {
        case 'red':
            return 'is red';
        case 'green':
            return 'is green';
        // Since pattern matching is not exhaustive this will not compile
        // case 'blue':
        //     return 'is blue';
        default:
            return unknownColor(c); // Argument of type 'string' is not assignable to parameter of type 'never'
    }
}


// ___________________________________________

type Read = {}
type Write = {}
declare const toWrite: Write

declare class MyCache<T, R> {
    put(val: T): boolean;
    get(): R;
}

const cache = new MyCache<Write, Read>()
cache.put(toWrite) // ✅ allowed

declare class ReadOnlyCache<R> extends MyCache<never, R> {}
// Now type parameter `T` inside MyCache becomes `never`

const readonlyCache = new ReadOnlyCache<Read>()
readonlyCache.put(data) // ❌ Argument of type 'Data' is not assignable to parameter of type 'never'.

// ^ likely not the best way to do inheritance, but it's an example of how to use never
