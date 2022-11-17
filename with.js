// From the docs:
// The with statement adds the given object to the head of this scope chain during the evaluation of its statement body.
// Every unqualified name would first be searched within the object (through a in check) before searching in the
// upper scope chain.

with({ "Math": { "random": () => "hei" } }){
	Math.random()
}
// > "hei"
