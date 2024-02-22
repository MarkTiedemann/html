# html

**HTML templating for JavaScript.**

- No new templating syntax – use the ternary operator (`?`) for conditional rendering and `Array.map()` for rendering lists
- All template variables will be escaped by default (except if you wrap their values using the `raw()` function)
- The type signature only allows `string`s to be used as variables – `null`, `undefined`, `boolean`, `number`, `Date`, and other types are intentionally forbidden so they are not unintentionally converted to `string`s
- Benchmarked for max. performance

## Example

```ts
import { html } from "jsr:@mark/html@1";

Deno.serve(async request => {
	const { method, url } = request;
	const headers = [...request.headers.entries()];
	return new Response(html`
		<!DOCTYPE html>

		<h1>Request</h1>
		<dl>
			<dt>Method
			<dd>${method}
			<dt>URL
			<dd>${url}
		</dl>

		<h2>Headers</h2>
		<table>
			${headers.map(([key, value]) => html`
			<tr>
				<td>${key}
				<td>${value}
			`)}
		</table>

		${method === "POST" || method === "PUT"
			? html`
				<h2>Body</h2>
				<pre>${await request.text()}</pre>`
			: ""
		}
	`(), { headers: { "content-type": "text/html" }});
});

```

## License

[CC0](https://creativecommons.org/publicdomain/zero/1.0/), no copyright
