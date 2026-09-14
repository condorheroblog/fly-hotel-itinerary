import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Logo from "./Logo";

export default function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
			<div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
				<div>
					<Logo />
					<p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
						{t("landing.footerNote")}
					</p>
				</div>
				<nav className="flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
					<Link to="/flight" className="hover:text-brand-600 dark:hover:text-brand-300">
						{t("nav.flight")}
					</Link>
					<Link to="/hotel" className="hover:text-brand-600 dark:hover:text-brand-300">
						{t("nav.hotel")}
					</Link>
					<a
						href="https://github.com/condorheroblog/fly-hotel-itinerary"
						target="_blank"
						rel="noreferrer noopener"
						className="hover:text-brand-600 dark:hover:text-brand-300"
					>
						GitHub
					</a>
				</nav>
				<div className="text-sm text-slate-400">
					MIT ©
					{" "}
					{year}
					{" "}
					Condor Hero
				</div>
			</div>
		</footer>
	);
}
