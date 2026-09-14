import type { ReactNode, RefObject } from "react";
import {

	useEffect,
	useRef,
	useState,
} from "react";

export const STAGE_WIDTH = 800;

/**
 * Fixed-width paper stage. On screens narrower than 800px the paper is
 * scaled down visually; the underlying node keeps its natural size so that
 * snapDOM always captures a full-resolution, untransformed element.
 */
export default function Stage({
	stageRef,
	children,
}: {
	stageRef: RefObject<HTMLDivElement | null>
	children: ReactNode
}) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const wrap = wrapRef.current;
		const el = stageRef.current;
		if (!wrap || !el)
			return;

		const update = () => {
			setScale(Math.min(1, wrap.clientWidth / STAGE_WIDTH));
			setHeight(el.offsetHeight);
		};
		update();

		const ro = new ResizeObserver(update);
		ro.observe(wrap);
		ro.observe(el);
		window.addEventListener("resize", update);
		return () => {
			ro.disconnect();
			window.removeEventListener("resize", update);
		};
	}, [stageRef]);

	return (
		<div ref={wrapRef} className="w-full">
			<div
				className="relative w-full"
				style={{ height: Math.max(height, 100) * scale }}
			>
				<div
					className="absolute top-0"
					style={{
						left: "50%",
						width: STAGE_WIDTH,
						height: height || "auto",
						transform: `translateX(-${(STAGE_WIDTH / 2) * scale}px) scale(${scale})`,
						transformOrigin: "top left",
					}}
				>
					<div ref={stageRef} className="doc-stage shadow-2xl shadow-slate-900/20">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
