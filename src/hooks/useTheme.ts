import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "fhi-theme";

function initialTheme(): Theme {
	try {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved === "light" || saved === "dark")
			return saved;
	}
	catch {
		// ignore
	}
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(initialTheme);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		root.style.colorScheme = theme;
		const meta = document.querySelector("meta[name=\"theme-color\"]");
		meta?.setAttribute("content", theme === "dark" ? "#020617" : "#2563eb");
		try {
			window.localStorage.setItem(STORAGE_KEY, theme);
		}
		catch {
			// ignore
		}
	}, [theme]);

	const toggle = useCallback(() => {
		setTheme(prev => (prev === "dark" ? "light" : "dark"));
	}, []);

	return { theme, toggle };
}
