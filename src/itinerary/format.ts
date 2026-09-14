import type { DocLang } from "./types";

/* ----------------------------- date helpers ----------------------------- */

const EN_MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const EN_MONTHS_FULL = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const EN_WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ZH_WEEKDAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

/** Parse YYYY-MM-DD without timezone shifts. */
export function parseDate(iso: string): { y: number, m: number, d: number } | null {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
	if (!match)
		return null;
	return {
		y: Number(match[1]),
		m: Number(match[2]),
		d: Number(match[3]),
	};
}

export function isValidDate(iso: string): boolean {
	const p = parseDate(iso);
	if (!p)
		return false;
	const dt = new Date(p.y, p.m - 1, p.d);
	return dt.getFullYear() === p.y && dt.getMonth() === p.m - 1 && dt.getDate() === p.d;
}

function weekdayIndex(p: { y: number, m: number, d: number }): number {
	return new Date(p.y, p.m - 1, p.d).getDay();
}

// Tue Sep15 | Sep16 | Oct27,1997 | 1997-10-27 | 28-FEB-24 | 7FEB 2024 | September 13, 2026 | 31 Oct
export type DateVariant = "weekday" | "monthDay" | "full" | "numeric" | "dashed" | "issueUpper" | "fullMonth" | "dayMonth";

function formatDateEn(iso: string, variant: DateVariant): string {
	const p = parseDate(iso);
	if (!p)
		return iso;
	switch (variant) {
		case "weekday":
			return `${EN_WEEKDAYS_SHORT[weekdayIndex(p)]}, ${EN_MONTHS[p.m - 1]} ${p.d}`;
		case "monthDay":
			return `${EN_MONTHS[p.m - 1]} ${p.d}`;
		case "full":
			return `${EN_MONTHS[p.m - 1]} ${p.d}, ${p.y}`;
		case "numeric":
			return iso;
		case "dashed":
			return `${String(p.d).padStart(2, "0")}-${EN_MONTHS[p.m - 1].toUpperCase()}-${String(p.y).slice(2)}`;
		case "issueUpper":
			return `${p.d}${EN_MONTHS[p.m - 1].toUpperCase()} ${p.y}`;
		case "fullMonth":
			return `${EN_MONTHS_FULL[p.m - 1]} ${p.d}, ${p.y}`;
		case "dayMonth":
			return `${p.d} ${EN_MONTHS[p.m - 1]}`;
	}
}

function formatDateZh(iso: string, variant: DateVariant): string {
	const p = parseDate(iso);
	if (!p)
		return iso;
	switch (variant) {
		case "weekday":
			return `${p.m}月${p.d}日 ${ZH_WEEKDAYS[weekdayIndex(p)]}`;
		case "monthDay":
		case "dayMonth":
			return `${p.m}月${p.d}日`;
		case "full":
		case "numeric":
		case "fullMonth":
			return `${p.y}年${p.m}月${p.d}日`;
		case "dashed":
			return `${p.y}-${String(p.m).padStart(2, "0")}-${String(p.d).padStart(2, "0")}`;
		case "issueUpper":
			return `${p.y}年${p.m}月${p.d}日`;
	}
}

export function formatDate(
	iso: string,
	variant: DateVariant,
	lang: Exclude<DocLang, "bi">,
): string {
	return lang === "zh" ? formatDateZh(iso, variant) : formatDateEn(iso, variant);
}

/** Weekday short label used under date blocks. */
export function formatWeekday(iso: string, lang: Exclude<DocLang, "bi">): string {
	const p = parseDate(iso);
	if (!p)
		return "";
	const idx = weekdayIndex(p);
	return lang === "zh" ? ZH_WEEKDAYS[idx]! : EN_WEEKDAYS_SHORT[idx]!;
}

/** "2024-05-04 20:55" style combined value used in table layouts. */
export function formatDateTime(
	date: string,
	time: string,
	lang: Exclude<DocLang, "bi">,
): string {
	if (lang === "zh")
		return `${formatDateZh(date, "numeric")} ${time}`;
	return `${date} ${time}`;
}

/** Parses "YYYY-MM-DDTHH:MM" → "02:07, September 13, 2026". */
export function formatIssueDateTime(value: string, lang: Exclude<DocLang, "bi">): string {
	const [date, time = "00:00"] = value.split("T");
	if (!date)
		return value;
	if (lang === "zh")
		return `${formatDateZh(date, "full")} ${time}`;
	return `${time}, ${formatDateEn(date, "fullMonth")}`;
}

/** "22:00 28/FEB" (en) or "2月28日 22:00" (zh). */
export function formatAirlineDateTime(
	date: string,
	time: string,
	lang: Exclude<DocLang, "bi">,
): string {
	const p = parseDate(date);
	if (!p)
		return `${date} ${time}`;
	if (lang === "zh")
		return `${p.m}月${p.d}日 ${time}`;
	return `${time} ${String(p.d).padStart(2, "0")}/${EN_MONTHS[p.m - 1].toUpperCase()}`;
}

/* ----------------------------- money helpers ---------------------------- */

export function formatMoney(
	amount: number,
	currency: string,
	lang: Exclude<DocLang, "bi">,
): string {
	try {
		return new Intl.NumberFormat(lang === "zh" ? "zh-CN" : "en-GB", {
			style: "currency",
			currency: currency.trim().toUpperCase() || "CNY",
			currencyDisplay: "narrowSymbol",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	}
	catch {
		return `${currency} ${amount.toFixed(2)}`;
	}
}

/** e.g. "CNY 2,640.04" / "JPY 1,200" — code style used on hotel vouchers. */
export function formatMoneyCode(
	amount: number,
	currency: string,
	lang: Exclude<DocLang, "bi">,
): string {
	try {
		return new Intl.NumberFormat(lang === "zh" ? "zh-CN" : "en-GB", {
			style: "currency",
			currency: currency.trim().toUpperCase() || "CNY",
			currencyDisplay: "code",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount).replace(/\s+/g, " ");
	}
	catch {
		return `${currency} ${amount.toFixed(2)}`;
	}
}

/* --------------------------- duration helpers --------------------------- */

export function formatDuration(minutes: number, lang: Exclude<DocLang, "bi">): string {
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	if (lang === "zh")
		return h > 0 ? `${h}小时${m > 0 ? `${m}分` : ""}` : `${m}分钟`;
	return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}

export function isOvernight(departDate: string, arriveDate: string): boolean {
	return departDate !== arriveDate;
}
