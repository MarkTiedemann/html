export function escape(str: string) {
	return str.replaceAll(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
}
