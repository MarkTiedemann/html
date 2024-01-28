const rawString = Symbol();

interface RawString {
	[rawString]: string;
};

Deno.bench("object-create", () => {
	const obj: RawString = Object.create(null);
	obj[rawString] = "bench";
	obj;
})

Deno.bench("object-literal", () => {
	const obj: RawString = { [rawString]: "bench" };
	obj;
});
