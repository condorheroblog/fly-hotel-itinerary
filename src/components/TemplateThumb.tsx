import type { ReactNode } from "react";
import {

	useEffect,
	useRef,
	useState,
} from "react";
import { STAGE_WIDTH } from "./Stage";

/**
 * Self-contained scaled preview used in landing-page gallery cards.
 */
export default function TemplateThumb({
	children,
	label,
	description,
}: {
	children: ReactNode
	label: ReactNode
	description?: ReactNode
}) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const docRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(0.5);
	const [height, setHeight] = useState(600);

	useEffect(() => {
		const wrap = wrapRef.current;
		const doc = docRef.current;
		if (!wrap || !doc)
			return;
		const update = () => {
			setScale(wrap.clientWidth / STAGE_WIDTH);
			setHeight(doc.offsetHeight);
		};
		update();
		const ro = new ResizeObserver(update);
		ro.observe(wrap);
		ro.observe(doc);
		return () => ro.disconnect();
	}, []);

	return (
		<div className="group relative">
			<div
				ref={wrapRef}
				className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-200/70 dark:border-slate-700 dark:bg-slate-800"
			>
				<div style={{ height: height * scale }} className="relative w-full">
					<div
						className="absolute left-0 top-0 origin-top-left"
						style={{ width: STAGE_WIDTH, transform: `scale(${scale})` }}
					>
						<div ref={docRef} className="doc-stage pointer-events-none select-none">
							{children}
						</div>
					</div>
				</div>
			</div>
			<div className="mt-3 flex items-start justify-between gap-3">
				<div>
					<div className="text-sm font-bold text-slate-800 dark:text-slate-100">
						{label}
					</div>
					{description && (
						<div className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
							{description}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
