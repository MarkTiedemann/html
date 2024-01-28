import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts";
import { escape as escapeRegex } from "./escape-regex.ts";
import { escape as escapeReplace } from "./escape-replace.ts";

Deno.test("regex", () => {
	assertEquals("&#34;&#38;&#60;&#62;&#34;&#39;", escapeRegex(`"&<>"'`));
});

Deno.test("replace", () => {
	assertEquals("&quot;&amp;&lt;&gt;&quot;&apos;", escapeReplace(`"&<>"'`));
});
