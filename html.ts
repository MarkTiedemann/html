const rawString: unique symbol = Symbol();

/** A string that will not be escaped. */
export interface RawString {
	[rawString]: string;
}

/** Create a raw string that will not be escaped. */
export function raw(str: string): RawString {
	return { [rawString]: str };
}

/** A stringifiable argument for the `html` template function. */
export type Argument =
	| string
	| string[]
	| (() => string)
	| (() => string)[]
	| RawString;

/** Render HTML with (nested) template strings. Variables will be escaped by default.
 *
 * @example
 * ```ts
 * import { html } from "jsr:@mark/html@1";
 * 
 * console.log(html`
 *   <!DOCTYPE html>
 *   <h1>Hello from ${Deno.build.os}</h1>
 *   <h2>Script arguments:</h2>
 *   <ol>
 *     ${Deno.args.map(arg => html`
 *       <li>${arg}</li>
 *     `)}
 *   </ol>
 * `());
 * ```
 */
export function html({ raw }: TemplateStringsArray, ...args: Argument[]): () => string {
	return () => {
		const len = raw.length - 1;
		let html = "";
		for (let i = 0; i < len; i++) {
			html += raw[i] + stringify(args[i]);
		}
		return html + raw[len];
	};
}

function stringify(arg: Argument) {
	switch (typeof arg) {
		case "string":
			return escape(arg);
		case "function":
			return arg();
		default: {
			if (rawString in arg) {
				return arg[rawString];
			} else {
				let html = "";
				for (const x of arg) {
					html += stringify(x);
				}
				return html;
			}
		}
	}
}

/** Escape a string for safe usage in HTML. */
export function escape(str: string): string {
	return str.replaceAll(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
}
