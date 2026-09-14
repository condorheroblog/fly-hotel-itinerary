import type { FlightTemplateId, HotelTemplateId } from "./types";

const DIGITS = "0123456789";
const PNR_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // no I/O to avoid confusion

function pick(chars: string): string {
	return chars[Math.floor(Math.random() * chars.length)]!;
}

/** Cryptographically-light random digit string with a fixed leading prefix. */
function digitsWithPrefix(prefix: string, totalLength: number): string {
	const rest = Array.from(
		{ length: Math.max(0, totalLength - prefix.length) },
		() => pick(DIGITS),
	).join("");
	return `${prefix}${rest}`;
}

/**
 * Standard airline PNR: 6 uppercase letters (optionally with digits).
 * Real GDS PNRs avoid ambiguous characters.
 */
export function generatePnr(length = 6): string {
	return Array.from({ length }, () => pick(PNR_ALPHABET)).join("");
}

/**
 * Platform-style order/booking numbers. Each template follows the format
 * observed on the corresponding real-world document.
 */
export function generateFlightIds(templateId: FlightTemplateId): {
	bookingNo: string
	pnr: string
} {
	switch (templateId) {
		case "tripcom":
			// Trip.com booking no. — 16 digits, starts with 1
			return { bookingNo: digitsWithPrefix("1", 16), pnr: generatePnr() };
		case "qunar":
			// Qunar order no. — 12 digits, historically starts with 3
			return { bookingNo: digitsWithPrefix("3", 12), pnr: generatePnr() };
		case "airline":
			// Airline-issued order ID — 11 digits starting 30
			return { bookingNo: digitsWithPrefix("30", 11), pnr: generatePnr() };
	}
}

export function generateHotelIds(templateId: HotelTemplateId): {
	confirmationNo: string
	bookingNo: string
} {
	// Ctrip/Trip.com hotel booking no. — 16 digits starting 1128
	const bookingNo = digitsWithPrefix("1128", 16);
	switch (templateId) {
		case "card":
			// Domestic-style confirmation: 16 digits starting 1128
			return { confirmationNo: digitsWithPrefix("1128", 16), bookingNo };
		case "banner":
			// International-style confirmation: 4 digits + 2 letters + 6 digits
			return {
				confirmationNo: `${digitsWithPrefix("", 4)}${pick(PNR_ALPHABET)}${pick(PNR_ALPHABET)}${digitsWithPrefix("", 6)}`,
				bookingNo,
			};
	}
}
