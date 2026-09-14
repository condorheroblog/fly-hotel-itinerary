/* eslint-disable react-refresh/only-export-components -- shared doc rendering kit: palette, glyphs and bilingual primitives live together by design */
import type { CSSProperties, ReactNode } from "react";
import type { L10n } from "./doc-labels";
import type { DateVariant } from "./format";
import type { DocLang } from "./types";
import { cn } from "../lib/utils";
import { docText } from "./doc-labels";
import { formatDate, formatMoney, formatWeekday } from "./format";

/* -------------------------------- palette -------------------------------- */

export const C = {
	ink: "#1f2329",
	sub: "#646a73",
	faint: "#8f959e",
	line: "#dee0e3",
	lineSoft: "#ebedf0",
	tripBlue: "#1f6fd6",
	tripOrange: "#e05325",
	ctripBlue: "#1f7fd0",
	ctripDeep: "#1668b3",
	headerGray: "#c9cdd4",
} as const;

/* ---------------------------- bilingual pieces --------------------------- */

interface PairTextProps {
	pair: L10n
	lang: DocLang
	className?: string
	subClassName?: string
	/** Render inline so a value can follow the label on the same line. */
	inline?: boolean
}

/** Stacked bilingual text — secondary Chinese on its own smaller line. */
export function DT({ pair, lang, className, subClassName, inline }: PairTextProps) {
	const { primary, secondary } = docText(pair, lang);
	// Single-language inline labels stay plain inline text so they flow
	// naturally inside a paragraph instead of becoming an atomic box.
	if (inline && !secondary)
		return <span className={cn("leading-snug", className)}>{primary}</span>;
	return (
		<span className={cn(inline ? "inline-flex flex-col align-baseline" : "flex flex-col", "leading-snug", className)}>
			<span>{primary}</span>
			{secondary && (
				<span className={cn("text-[0.82em] text-[#646a73]", subClassName)}>
					{secondary}
				</span>
			)}
		</span>
	);
}

/** Inline bilingual text, secondary rendered smaller after a gap. */
export function IT({
	pair,
	lang,
	className,
}: PairTextProps) {
	const { primary, secondary } = docText(pair, lang);
	return (
		<span className={className}>
			{primary}
			{secondary && (
				<span className="ml-1 text-[0.78em] text-[#8f959e]">{secondary}</span>
			)}
		</span>
	);
}

export function Txt({
	en,
	zh,
	lang,
	className,
}: {
	en: string
	zh?: string
	lang: DocLang
	className?: string
}) {
	const pair: L10n = { en, zh: zh ?? "" };
	return <DT pair={pair} lang={lang} className={className} />;
}

export function TxtI({
	en,
	zh,
	lang,
	className,
}: {
	en: string
	zh?: string
	lang: DocLang
	className?: string
}) {
	const pair: L10n = { en, zh: zh ?? "" };
	return <IT pair={pair} lang={lang} className={className} />;
}

/** Date that stacks the secondary language in bilingual mode. */
export function DD({
	iso,
	variant,
	lang,
	className,
	subClassName,
}: {
	iso: string
	variant: DateVariant
	lang: DocLang
	className?: string
	subClassName?: string
}) {
	const en = formatDate(iso, variant, "en");
	const zh = formatDate(iso, variant, "zh");
	return (
		<span className={cn("flex flex-col leading-snug", className)}>
			<span>{lang === "zh" ? zh : en}</span>
			{lang === "bi" && (
				<span className={cn("text-[0.82em] text-[#646a73]", subClassName)}>{zh}</span>
			)}
		</span>
	);
}

export function WD({ iso, lang, className }: { iso: string, lang: DocLang, className?: string }) {
	return <span className={className}>{formatWeekday(iso, lang === "zh" ? "zh" : "en")}</span>;
}

export function Money({
	amount,
	currency,
	lang,
	style,
}: {
	amount: number
	currency: string
	lang: DocLang
	style?: CSSProperties
}) {
	return (
		<span style={style}>
			{formatMoney(amount, currency, lang === "zh" ? "zh" : "en")}
		</span>
	);
}

/* ------------------------------- brand marks ------------------------------ */

export function CtripBrand({
	size = "md",
	inverted = false,
}: {
	size?: "md" | "lg"
	inverted?: boolean
}) {
	const dim = size === "lg" ? "h-12 w-12 text-[22px]" : "h-9 w-9 text-base";
	return (
		<span className="inline-flex items-center gap-2.5">
			<span
				className={cn(
					"inline-flex items-center justify-center rounded-[10px] font-bold",
					dim,
				)}
				style={{
					background: inverted ? "#ffffff" : C.ctripBlue,
					color: inverted ? C.ctripBlue : "#ffffff",
				}}
			>
				携
			</span>
			<span className="flex flex-col leading-none">
				<span
					className={cn("font-extrabold", size === "lg" ? "text-[26px]" : "text-[19px]")}
					style={{ color: inverted ? "#ffffff" : C.ctripBlue }}
				>
					携程旅行
				</span>
				<span
					className="mt-1 text-[9px] font-semibold tracking-[0.28em]"
					style={{ color: inverted ? "rgba(255,255,255,.75)" : "#7d8590" }}
				>
					CTRIP.COM
				</span>
			</span>
		</span>
	);
}

export function QunarBrand() {
	return (
		<span className="inline-flex items-center gap-2.5">
			<span
				className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-base font-bold text-white"
				style={{ background: "#06b9d6" }}
			>
				去
			</span>
			<span className="flex flex-col leading-none">
				<span className="text-[20px] font-extrabold tracking-wide text-[#1f2329]">
					去哪儿旅行
				</span>
				<span className="mt-1 text-[9px] font-semibold tracking-[0.34em] text-[#7d8590]">
					QUNAR.COM · 总有你要的低价
				</span>
			</span>
		</span>
	);
}

/* ------------------------------ airline glyphs ---------------------------- */

function airlineColor(flightNo: string): string {
	const code = flightNo.replace(/[^A-Z]/gi, "").toUpperCase();
	if (code.startsWith("MU") || code.startsWith("CZ") || code.startsWith("CA"))
		return code.startsWith("CA") ? "#c8161d" : "#e2231a";
	if (code.startsWith("5J") || code.startsWith("PR"))
		return "#1f7fd0";
	if (code.startsWith("9C"))
		return "#009a44";
	return "#64748b";
}

export function PlaneMark({ flightNo, className }: { flightNo: string, className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={cn("h-[15px] w-[15px]", className)} aria-hidden="true">
			<path
				fill={airlineColor(flightNo)}
				d="M21.8 15.6 13.9 11V4.3c0-.9-.5-1.7-1.3-2-.8-.3-1.7 0-2.1.8-.2.4-.2.8-.1 1.2l1.2 6.1-5 2.6-2-.5c-.4-.1-.8.1-1 .4l-.3.5 4 2.1-4 2.1.3.5c.2.4.6.5 1 .4l2-.5 5 2.6-1.2 6.1c-.1.4 0 .8.2 1.1.4.8 1.3 1.1 2.1.8.8-.3 1.3-1.1 1.3-2V17l7.9-4.6c.6-.3.6-1.1 0-1.4l-.1-.1Z"
				transform="rotate(90 12 12) scale(0.92) translate(1 1)"
			/>
		</svg>
	);
}

export function ChatIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={cn("h-[15px] w-[15px]", className)} aria-hidden="true">
			<path
				fill="none"
				stroke="#4f8ef7"
				strokeWidth="1.8"
				strokeLinejoin="round"
				d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 12.5Z"
			/>
		</svg>
	);
}

export function BirdIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={cn("h-[14px] w-[14px]", className)} aria-hidden="true">
			<path
				fill="#0e8fa8"
				d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2c-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.9 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5v.1a4 4 0 0 0 3.2 3.9c-.6.2-1.2.2-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.1a11.3 11.3 0 0 0 6.1 1.8c7.4 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.5-1.3 2-2.1Z"
			/>
		</svg>
	);
}

/** Thin dotted section divider like the Trip.com document. */
export function DottedDivider() {
	return (
		<div
			className="my-5 h-0 w-full"
			style={{ borderTop: `2px dotted ${C.line}` }}
		/>
	);
}

/** Reusable labeled row (label left, value right) for compact tables. */
export function LabeledRow({
	label,
	children,
	className,
}: {
	label: ReactNode
	children: ReactNode
	className?: string
}) {
	return (
		<div className={cn("flex gap-6 text-[13px]", className)}>
			<div className="w-44 shrink-0 text-[#646a73]">{label}</div>
			<div className="flex-1 text-[#1f2329]">{children}</div>
		</div>
	);
}
