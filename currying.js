function curry(f) { // curry(f) does the currying transform
	return function(a) {
		return function(b) {
			return f(a, b);
		};
	};
}

function sum(a, b) {
	return a + b
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(4))

function curryVarArgs(func) {
	return function curried(...args) {
		if (args.length >= func.length) {
			return func.apply(this, args);
		} else {
			return function(...args2) {
				return curried.apply(this, args.concat(args2));
			}
		}
	};

}
