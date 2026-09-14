import type { ExportBusy } from "../hooks/useExporter";
import { useTranslation } from "react-i18next";
import { cn } from "../lib/utils";

function DownloadIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 3v12m0 0 4-4m-4 4-4-4" />
			<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
		</svg>
	);
}

function PrinterIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M6 9V3h12v6" />
			<path d="M6 18H5a3 3 0 0 1-3-3v-3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a3 3 0 0 1-3 3h-1" />
			<path d="M6 14h12v7H6z" />
		</svg>
	);
}

function Spinner() {
	return (
		<svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
			<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
			<path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
		</svg>
	);
}

export default function ExportBar({
	busy,
	onImage,
	onPrint,
	vertical = false,
}: {
	busy: ExportBusy
	onImage: (format: "png" | "jpg") => void
	onPrint: () => void
	vertical?: boolean
}) {
	const { t } = useTranslation();

	const btn
		= "inline-flex min-w-[112px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-[0.97] disabled:opacity-70";

	return (
		<div className={cn("flex gap-2", vertical ? "flex-col" : "flex-row flex-wrap")}>
			<button
				type="button"
				onClick={() => onImage("png")}
				disabled={busy !== null}
				className={cn(
					btn,
					"bg-brand-600 text-white hover:bg-brand-700",
				)}
			>
				{busy === "png" ? <Spinner /> : <DownloadIcon />}
				{busy === "png" ? t("exportBar.busy") : t("exportBar.png")}
			</button>
			<button
				type="button"
				onClick={() => onImage("jpg")}
				disabled={busy !== null}
				className={cn(
					btn,
					"border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
				)}
			>
				{busy === "jpg" ? <Spinner /> : <DownloadIcon />}
				{busy === "jpg" ? t("exportBar.busy") : t("exportBar.jpg")}
			</button>
			<button
				type="button"
				onClick={onPrint}
				disabled={busy !== null}
				className={cn(
					btn,
					"border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
				)}
			>
				{busy === "print" ? <Spinner /> : <PrinterIcon />}
				{busy === "print" ? t("exportBar.busy") : t("exportBar.print")}
			</button>
		</div>
	);
}
