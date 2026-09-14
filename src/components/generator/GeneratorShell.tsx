import type { ReactNode } from "react";
import type { DocLang } from "../../itinerary/types";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useExporter } from "../../hooks/useExporter";
import { cn } from "../../lib/utils";
import ExportBar from "../ExportBar";
import PrintFrame from "../PrintFrame";
import Stage from "../Stage";
import { SegmentedControl } from "../ui/controls";

interface ShellTemplate {
	id: string
	nameKey: string
	descKey: string
}

interface ToastState {
	kind: "ok" | "err"
	text: string
}

export default function GeneratorShell({
	title,
	subtitle,
	templates,
	templateId,
	onTemplateChange,
	docLang,
	onDocLangChange,
	onSample,
	sampleDisabled,
	form,
	doc,
	fileName,
}: {
	title: string
	subtitle: string
	templates: ShellTemplate[]
	templateId: string
	onTemplateChange: (id: string) => void
	docLang: DocLang
	onDocLangChange: (lang: DocLang) => void
	onSample: () => void
	sampleDisabled?: boolean
	form: ReactNode
	doc: ReactNode
	fileName: string
}) {
	const { t } = useTranslation();
	const stageRef = useRef<HTMLDivElement>(null);
	const [toast, setToast] = useState<ToastState | null>(null);
	const toastTimerRef = useRef<number | null>(null);

	const notify = (kind: ToastState["kind"], text: string) => {
		setToast({ kind, text });
		if (toastTimerRef.current)
			window.clearTimeout(toastTimerRef.current);
		toastTimerRef.current = window.setTimeout(setToast, 2600, null);
	};

	const { busy, downloadImage, print } = useExporter(stageRef, () => fileName);

	const handleImage = async (format: "png" | "jpg") => {
		const ok = await downloadImage(format);
		if (ok === true)
			notify("ok", t("exportBar.success"));
		else if (ok === false)
			notify("err", t("exportBar.failed"));
	};

	return (
		<div className="mx-auto max-w-[1500px] px-3 py-6 sm:px-6">
			<div className="mb-5">
				<h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
					{title}
				</h1>
				<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
			</div>

			{/* toolbar */}
			<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
				<div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
					<div className="flex flex-wrap gap-2">
						{templates.map((tpl) => {
							const active = tpl.id === templateId;
							return (
								<button
									key={tpl.id}
									type="button"
									onClick={() => onTemplateChange(tpl.id)}
									className={cn(
										"flex-1 basis-[200px] rounded-xl border p-3 text-left transition-all",
										active
											? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/20 dark:bg-brand-950/40"
											: "border-slate-200 hover:border-brand-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-brand-700 dark:hover:bg-slate-800/60",
									)}
								>
									<div
										className={cn(
											"text-sm font-bold",
											active
												? "text-brand-700 dark:text-brand-300"
												: "text-slate-800 dark:text-slate-100",
										)}
									>
										{t(tpl.nameKey as never)}
									</div>
									<div className="mt-0.5 text-[11.5px] leading-snug text-slate-500 dark:text-slate-400">
										{t(tpl.descKey as never)}
									</div>
								</button>
							);
						})}
					</div>

					<div className="flex flex-wrap items-center gap-3 lg:justify-end">
						<div className="flex items-center gap-2">
							<span className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
								{t("doc.languageLabel")}
							</span>
							<SegmentedControl<DocLang>
								value={docLang}
								onChange={onDocLangChange}
								size="sm"
								options={[
									{ value: "en", label: t("doc.en") },
									{ value: "zh", label: t("doc.zh") },
									{ value: "bi", label: t("doc.bi") },
								]}
							/>
						</div>
						<button
							type="button"
							onClick={onSample}
							disabled={sampleDisabled}
							className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
						>
							<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
							</svg>
							{t("common.sample")}
						</button>
					</div>
				</div>
			</div>

			{/* editor + preview */}
			<div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[400px_minmax(0,1fr)]">
				<div className="order-2 space-y-4 lg:order-1 lg:sticky lg:top-[84px] lg:max-h-[calc(100vh-100px)] lg:self-start lg:overflow-y-auto lg:pr-1 nice-scroll">
					{form}
				</div>

				<div className="order-1 lg:order-2">
					<div className="sticky top-[72px] z-20 mb-3 rounded-xl border border-slate-200/70 bg-slate-100/90 px-3 py-2.5 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/90">
						<ExportBar busy={busy} onImage={handleImage} onPrint={print} />
					</div>
					<div className="rounded-2xl bg-slate-200/50 p-2 sm:p-6 dark:bg-slate-900/50">
						<Stage stageRef={stageRef}>{doc}</Stage>
					</div>
				</div>
			</div>

			<PrintFrame>{doc}</PrintFrame>

			{/* toast */}
			{toast && (
				<div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-[fadein_.2s_ease]">
					<div
						className={cn(
							"flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-xl",
							toast.kind === "ok" ? "bg-emerald-600" : "bg-red-500",
						)}
					>
						{toast.kind === "ok" ? "✓" : "!"}
						{" "}
						{toast.text}
					</div>
				</div>
			)}
		</div>
	);
}
