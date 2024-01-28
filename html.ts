const rawString = Symbol();

export interface RawString {
	[rawString]: string;
}

export function raw(str: string): RawString {
	return { [rawString]: str };
}

export type Argument =
	| string
	| string[]
	| (() => string)
	| (() => string)[]
	| RawString;

export function html({ raw }: TemplateStringsArray, ...args: Argument[]) {
	return () => {
		const len = raw.length - 1;
		let html = "";
		for (let i = 0; i < len; i++) {
			html += raw[i] + stringify(args[i]);
		}
		return html + raw[len];
	};
}

export function stringify(arg: Argument) {
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

export function escape(str: string) {
	return str.replaceAll(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
}
