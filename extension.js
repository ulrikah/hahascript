// extending a function with new properties
// e.g. by writing a norwegian version of the length function
Object.defineProperty(Array.prototype, "lengde", {
	value : () => this.length,
	configurable : true
})

// even simpler, but should be avoided based on this answer: https://stackoverflow.com/a/9354310
Array.prototype.lengde = () => this.length;
