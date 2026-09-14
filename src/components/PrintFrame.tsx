import type { ReactNode } from "react";
import { createPortal } from "react-dom";

let printRoot: HTMLDivElement | null = null;

function getPrintRoot(): HTMLDivElement {
	if (!printRoot) {
		printRoot = document.createElement("div");
		printRoot.id = "print-root";
		document.body.appendChild(printRoot);
	}
	return printRoot;
}

/**
 * Duplicates the current document into a body-level node that is hidden on
 * screen and revealed by the print stylesheet (see index.css @media print).
 */
export default function PrintFrame({ children }: { children: ReactNode }) {
	return createPortal(
		<div className="doc-stage">{children}</div>,
		getPrintRoot(),
	);
}
