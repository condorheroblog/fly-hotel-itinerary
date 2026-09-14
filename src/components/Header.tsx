import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";
import Logo from "./Logo";

const REPO_URL = "https://github.com/condorheroblog/fly-hotel-itinerary";

function SunIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
		</svg>
	);
}

function MoonIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
		</svg>
	);
}

function GithubIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
			<path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.3-.52-1.47.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
		</svg>
	);
}

export default function Header() {
	const { t, i18n } = useTranslation();
	const { theme, toggle } = useTheme();

	const links = [
		{ to: "/", label: t("nav.home"), end: true },
		{ to: "/flight", label: t("nav.flight"), end: false },
		{ to: "/hotel", label: t("nav.hotel"), end: false },
	];

	return (
		<header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/80">
			<div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2 sm:h-16 sm:flex-nowrap sm:py-0 sm:px-6">
				<Link to="/" aria-label="TripSheet home" className="shrink-0">
					<Logo />
				</Link>

				<nav className="nice-scroll order-3 -mx-1 flex w-full items-center gap-1 overflow-x-auto rounded-full border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900 sm:order-none sm:mx-0 sm:ml-auto sm:w-auto sm:overflow-visible">
					{links.map(link => (
						<NavLink
							key={link.to}
							to={link.to}
							end={link.end}
							className={({ isActive }) =>
								cn(
									"shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4",
									isActive
										? "bg-brand-600 text-white shadow-sm"
										: "text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300",
								)}
						>
							{link.label}
						</NavLink>
					))}
				</nav>

				<div className="ml-auto flex shrink-0 items-center gap-1.5 sm:ml-0">
					<button
						type="button"
						onClick={() => i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh")}
						className="rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-300"
						aria-label="Switch language"
					>
						{i18n.language === "zh" ? "EN" : "中文"}
					</button>
					<button
						type="button"
						onClick={toggle}
						className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-amber-500 dark:text-slate-300 dark:hover:bg-slate-800"
						aria-label="Toggle theme"
					>
						{theme === "dark" ? <SunIcon /> : <MoonIcon />}
					</button>
					<a
						href={REPO_URL}
						target="_blank"
						rel="noreferrer noopener"
						className="hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white sm:block"
						aria-label={t("nav.github")}
					>
						<GithubIcon />
					</a>
				</div>
			</div>
		</header>
	);
}
