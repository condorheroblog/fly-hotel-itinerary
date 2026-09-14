export function cn(
	...classes: Array<string | false | null | undefined>
): string {
	return classes.filter(Boolean).join(" ");
}

let counter = 0;

/** Stable-enough id for repeatable form rows. */
export function uid(prefix = "id"): string {
	counter += 1;
	return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

export function splitLines(value: string): string[] {
	return value
		.split(/\r?\n/)
		.map(line => line.trim())
		.filter(Boolean);
}

/** Split amenity text separated by newlines or "·". */
export function splitAmenities(value: string): string[] {
	return value
		.split(/\r?\n|[·•|]/)
		.map(item => item.trim())
		.filter(Boolean);
}

export function pluralRows(count: number): number[] {
	return Array.from({ length: Math.max(0, count) }, (_, i) => i);
}
