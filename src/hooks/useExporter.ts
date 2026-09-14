import { snapdom } from "@zumer/snapdom";
import { useCallback, useEffect, useRef, useState } from "react";

export type ExportBusy = null | "png" | "jpg" | "print";

export function useExporter(
	stageRef: React.RefObject<HTMLDivElement | null>,
	fileName: () => string,
) {
	const [busy, setBusy] = useState<ExportBusy>(null);
	const timerRef = useRef<number | null>(null);

	useEffect(() => () => {
		if (timerRef.current)
			window.clearTimeout(timerRef.current);
	}, []);

	const downloadImage = useCallback(async (format: "png" | "jpg") => {
		const el = stageRef.current;
		if (!el || busy)
			return;
		setBusy(format);
		try {
			const result = await snapdom(el, {
				scale: 2,
				backgroundColor: "#ffffff",
				embedFonts: true,
				fast: true,
				filename: fileName(),
			});
			await result.download({ format, filename: fileName() });
			return true;
		}
		catch (error) {
			console.error("[snapdom] export failed", error);
			return false;
		}
		finally {
			setBusy(null);
		}
	}, [busy, fileName, stageRef]);

	const print = useCallback(() => {
		if (busy)
			return;
		setBusy("print");
		timerRef.current = window.setTimeout(() => {
			window.print();
		}, 80);
		let fallback: number | undefined;
		const cleanup = () => {
			setBusy(null);
			window.removeEventListener("afterprint", onAfter);
			if (fallback)
				window.clearTimeout(fallback);
		};
		function onAfter() {
			cleanup();
		}
		window.addEventListener("afterprint", onAfter);
		// Safety net for environments where print() resolves without afterprint.
		fallback = window.setTimeout(cleanup, 30_000);
	}, [busy]);

	return { busy, downloadImage, print };
}
