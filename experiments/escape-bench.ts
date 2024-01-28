import { escape as escapeRegex } from "../experiments/escape-regex.ts";
import { escape as escapeReplace } from "../experiments/escape-replace.ts";

const random = new TextDecoder()
	.decode(crypto.getRandomValues(new Uint8Array(65536)));

Deno.bench("regex", () => {
	escapeRegex(random);
});

Deno.bench("replace", () => {
	escapeReplace(random);
});
