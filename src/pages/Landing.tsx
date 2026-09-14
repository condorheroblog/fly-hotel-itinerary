import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { LogoMark } from "../components/Logo";
import TemplateThumb from "../components/TemplateThumb";
import { cloneFlightSample, cloneHotelSample } from "../itinerary/defaults";
import { FLIGHT_TEMPLATES } from "../itinerary/flight";
import { HOTEL_TEMPLATES } from "../itinerary/hotel";

function ArrowRight() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M5 12h14m-6-6 6 6-6 6" />
		</svg>
	);
}

function FeatureIcon({ path }: { path: string }) {
	return (
		<div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300">
			<svg viewBox="0 0 24 24" className="h-5.5 w-5.5 h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<path d={path} />
			</svg>
		</div>
	);
}

export default function Landing() {
	const { t } = useTranslation();
	const og = `${import.meta.env.BASE_URL}og.jpg`;

	const flightThumbs = FLIGHT_TEMPLATES.map(tpl => (
		<TemplateThumb
			key={tpl.id}
			label={t(tpl.nameKey as never)}
			description={t(tpl.descKey as never)}
		>
			<tpl.Component data={cloneFlightSample(tpl.id)} lang="en" />
		</TemplateThumb>
	));

	const hotelThumbs = HOTEL_TEMPLATES.map(tpl => (
		<TemplateThumb
			key={tpl.id}
			label={t(tpl.nameKey as never)}
			description={t(tpl.descKey as never)}
		>
			<tpl.Component data={cloneHotelSample(tpl.id)} lang="en" />
		</TemplateThumb>
	));

	const features = [
		{ d: "M4 5h16M4 12h16M4 19h10", t: "feature1Title", s: "feature1Desc" },
		{ d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-3-9h6m-3-3v6", t: "feature2Title", s: "feature2Desc" },
		{ d: "M4 7V5h16v2M9 7v12m6-12v12M4 19h16", t: "feature3Title", s: "feature3Desc" },
		{ d: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", t: "feature4Title", s: "feature4Desc" },
		{ d: "M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", t: "feature5Title", s: "feature5Desc" },
		{ d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8ZM7 20h10v2H7z", t: "feature6Title", s: "feature6Desc" },
	];

	return (
		<div>
			{/* hero */}
			<section className="relative overflow-hidden">
				<div
					className="pointer-events-none absolute inset-0 opacity-90 dark:opacity-40"
					style={{
						background:
							"radial-gradient(900px 420px at 80% -10%, rgba(47,120,245,.18), transparent 60%), radial-gradient(700px 380px at 5% 0%, rgba(56,189,248,.14), transparent 55%)",
					}}
				/>
				<div className="relative mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
					<div className="mx-auto max-w-3xl text-center">
						<div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur dark:border-brand-800 dark:bg-slate-900/70 dark:text-brand-300">
							<LogoMark className="h-4 w-4" />
							{t("landing.heroBadge")}
						</div>
						<h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
							{t("landing.heroTitle")}
						</h1>
						<p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
							{t("landing.heroSubtitle")}
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<Link
								to="/flight"
								className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 active:scale-[0.98] sm:w-auto"
							>
								{t("landing.ctaFlight")}
								<ArrowRight />
							</Link>
							<Link
								to="/hotel"
								className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:border-brand-400 hover:text-brand-600 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500 sm:w-auto"
							>
								{t("landing.ctaHotel")}
								<ArrowRight />
							</Link>
						</div>
						<div className="mt-10 flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
							{[
								["5+", t("landing.statsTemplates")],
								["3", t("landing.statsLangs")],
								["3", t("landing.statsFormats")],
							].map(([num, label]) => (
								<div key={label}>
									<div className="text-2xl font-extrabold text-slate-900 dark:text-white">{num}</div>
									<div className="mt-0.5 text-xs">{label}</div>
								</div>
							))}
						</div>
					</div>

					{/* cover mockup */}
					<div className="mx-auto mt-14 max-w-5xl">
						<div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-2xl shadow-slate-900/15 dark:border-slate-800 dark:bg-slate-900">
							<img
								src={og}
								alt="TripSheet cover"
								className="w-full rounded-xl"
								loading="eager"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* template gallery */}
			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
				<div className="mb-10 text-center">
					<h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
						{t("landing.templatesTitle")}
					</h2>
					<p className="mt-3 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
						{t("landing.templatesSubtitle")}
					</p>
				</div>

				<div className="mb-8 flex items-center gap-3">
					<span className="h-5 w-1.5 rounded-full bg-brand-600" />
					<h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
						{t("nav.flight")}
						{" "}
						· 3
					</h3>
				</div>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{flightThumbs}
				</div>

				<div className="mb-8 mt-14 flex items-center gap-3">
					<span className="h-5 w-1.5 rounded-full bg-brand-600" />
					<h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
						{t("nav.hotel")}
						{" "}
						· 2
					</h3>
				</div>
				<div className="grid gap-6 sm:grid-cols-2">
					{hotelThumbs}
				</div>
			</section>

			{/* features */}
			<section className="border-y border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40">
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
					<div className="mb-10 text-center">
						<h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
							{t("landing.featuresTitle")}
						</h2>
						<p className="mt-3 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
							{t("landing.featuresSubtitle")}
						</p>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{features.map(f => (
							<div
								key={f.t}
								className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
							>
								<FeatureIcon path={f.d} />
								<h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
									{t(`landing.${f.t}` as never)}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
									{t(`landing.${f.s}` as never)}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* how it works */}
			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
				<h2 className="mb-10 text-center text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
					{t("landing.howTitle")}
				</h2>
				<div className="grid gap-8 md:grid-cols-3">
					{[1, 2, 3].map(n => (
						<div key={n} className="relative text-center">
							<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-xl font-extrabold text-white shadow-lg shadow-brand-600/30">
								{n}
							</div>
							<h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
								{t(`landing.how${n}` as never)}
							</h3>
							<p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
								{t(`landing.how${n}Desc` as never)}
							</p>
						</div>
					))}
				</div>
				<div className="mt-12 text-center">
					<Link
						to="/flight"
						className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 active:scale-[0.98]"
					>
						{t("landing.ctaFlight")}
						<ArrowRight />
					</Link>
				</div>
			</section>
		</div>
	);
}
