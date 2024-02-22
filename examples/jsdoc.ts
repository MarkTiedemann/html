import { html } from "../html.ts";

console.log(html`
	<!DOCTYPE html>
	<h1>Hello from ${Deno.build.os}</h1>
	<h2>Script arguments:</h2>
	<ol>
		${Deno.args.map(arg => html`
			<li>${arg}</li>
		`)}
	</ol>
`());
