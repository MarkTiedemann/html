export function escape(str: string): string {
	let result = "";
	for (const c of str) {
		switch (c) {
			case "&": result += "&amp;"; break;
			case "<": result += "&lt;"; break;
			case ">": result += "&gt;"; break;
			case `"`: result += "&quot;"; break;
			case `'`: result += "&apos;"; break;
			default: result += c;
		}
	}
	return result;
}
