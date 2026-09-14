import type {
	InputHTMLAttributes,
	ReactNode,
	SelectHTMLAttributes,
	TextareaHTMLAttributes,
} from "react";
import { cn } from "../../lib/utils";

const controlBase = [
	"w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 outline-none",
	"border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25",
	"dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500",
].join(" ");

export function Field({
	label,
	error,
	hint,
	required,
	children,
	className,
}: {
	label?: ReactNode
	error?: string | null
	hint?: ReactNode
	required?: boolean
	children: ReactNode
	className?: string
}) {
	return (
		<label className={cn("block", className)}>
			{label && (
				<span className="mb-1.5 flex items-center gap-1 text-[13px] font-medium text-slate-600 dark:text-slate-300">
					{label}
					{required && <span className="text-red-500">*</span>}
				</span>
			)}
			{children}
			{error
				? (
					<span className="mt-1 block text-xs text-red-500">{error}</span>
				)
				: hint
					? <span className="mt-1 block text-xs text-slate-400">{hint}</span>
					: null}
		</label>
	);
}

export function TextInput({
	className,
	invalid,
	...rest
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
	return (
		<input
			className={cn(
				controlBase,
				invalid && "border-red-400 focus:border-red-400 focus:ring-red-400/25",
				className,
			)}
			{...rest}
		/>
	);
}

export function TextAreaInput({
	className,
	invalid,
	...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
	return (
		<textarea
			className={cn(
				controlBase,
				"min-h-[72px] resize-y leading-relaxed",
				invalid && "border-red-400 focus:border-red-400 focus:ring-red-400/25",
				className,
			)}
			{...rest}
		/>
	);
}

export function SelectInput({
	className,
	children,
	...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
	return (
		<select className={cn(controlBase, "cursor-pointer appearance-none pr-8", className)} {...rest}>
			{children}
		</select>
	);
}

export function Checkbox({
	label,
	checked,
	onChange,
	className,
}: {
	label: ReactNode
	checked: boolean
	onChange: (v: boolean) => void
	className?: string
}) {
	return (
		<label className={cn("flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300", className)}>
			<input
				type="checkbox"
				checked={checked}
				onChange={e => onChange(e.target.checked)}
				className="h-4 w-4 rounded border-slate-300 text-brand-600 accent-brand-600"
			/>
			{label}
		</label>
	);
}

export interface SegmentedOption<T extends string> {
	value: T
	label: ReactNode
	title?: string
}

export function SegmentedControl<T extends string>({
	options,
	value,
	onChange,
	size = "md",
	className,
}: {
	options: SegmentedOption<T>[]
	value: T
	onChange: (v: T) => void
	size?: "sm" | "md"
	className?: string
}) {
	return (
		<div
			className={cn(
				"inline-flex flex-wrap rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-900",
				className,
			)}
		>
			{options.map(opt => (
				<button
					key={opt.value}
					type="button"
					title={opt.title}
					onClick={() => onChange(opt.value)}
					className={cn(
						"rounded-lg font-medium transition-all",
						size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
						value === opt.value
							? "bg-white text-brand-700 shadow-sm dark:bg-slate-700 dark:text-white"
							: "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200",
					)}
				>
					{opt.label}
				</button>
			))}
		</div>
	);
}

export function SectionCard({
	title,
	children,
	right,
}: {
	title: ReactNode
	children: ReactNode
	right?: ReactNode
}) {
	return (
		<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
			<div className="mb-4 flex items-center justify-between gap-3">
				<h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-100">{title}</h3>
				{right}
			</div>
			{children}
		</section>
	);
}
