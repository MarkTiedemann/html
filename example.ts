import { html } from "./html.ts";

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
