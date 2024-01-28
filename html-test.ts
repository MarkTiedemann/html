import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts";
import { html, raw } from "./html.ts";

Deno.test("basic", () => {
	assertEquals(
		`<!DOCTYPE html>`,
		html`<!DOCTYPE html>`()
	);
});

Deno.test("variable", () => {
	assertEquals(
		`<!DOCTYPE html>Hello, world!`,
		html`<!DOCTYPE html>${"Hello, world!"}`()
	);
});

Deno.test("escaped", () => {
	assertEquals(
		`<!DOCTYPE html>&#60;a&#62;`,
		html`<!DOCTYPE html>${"<a>"}`()
	);
});

Deno.test("not-escaped", () => {
	assertEquals(
		`<!DOCTYPE html><a>`,
		html`<!DOCTYPE html>${raw("<a>")}`()
	);
});

Deno.test("nested", () => {
	assertEquals(
		`<!DOCTYPE html><ul><li>1<li>2`,
		html`<!DOCTYPE html><ul>${[1, 2].map(x => html`<li>${x.toString()}`)}`()
	);
});
