import type { DocLang, FlightData, FlightSegment } from "../types";
import { docText, L } from "../doc-labels";
import { formatAirlineDateTime, formatDate, formatMoney } from "../format";
import { DD, DT, TxtI } from "../shared";

function SectionChip({ label, lang }: { label: { en: string, zh: string }, lang: DocLang }) {
	const { primary } = docText(label, lang);
	return (
		<div className="flex items-center gap-3">
			<span className="bg-[#c9cdd4] px-2.5 py-[3px] text-[13px] font-bold tracking-wide text-[#3a3f47]">
				{primary}
			</span>
			<span className="h-0 flex-1 border-t-[3px] border-dotted border-[#a0a6ae]" />
		</div>
	);
}

function Field({
	label,
	lang,
	children,
}: {
	label: { en: string, zh: string }
	lang: DocLang
	children: React.ReactNode
}) {
	return (
		<div className="whitespace-nowrap text-[13.5px]">
			<DT pair={label} lang={lang} inline />
			{" "}
			<span className="font-semibold">{children}</span>
		</div>
	);
}

function EndpointCell({
	seg,
	which,
	lang,
}: {
	seg: FlightSegment
	which: "depart" | "arrive"
	lang: DocLang
}) {
	const ep = seg[which];
	const city = lang === "zh" ? ep.cityZh || ep.city : ep.city;
	const airport = lang === "zh" ? ep.airportZh || ep.airport : ep.airport;
	return (
		<div className="space-y-1 px-2 py-3 text-center text-[12.5px] leading-snug">
			<div className="font-semibold">
				{ep.code}
				–
				{city}
			</div>
			<div className="whitespace-nowrap">
				{formatAirlineDateTime(ep.date, ep.time, lang === "zh" ? "zh" : "en")}
			</div>
			{ep.terminal && <div className="font-semibold uppercase">{ep.terminal}</div>}
			<div className="uppercase">{airport}</div>
		</div>
	);
}

export default function AirlineTemplate({ data, lang }: { data: FlightData, lang: DocLang }) {
	const border = "border-[1.5px] border-[#7d828a]";
	const notices = lang === "zh" ? L.noticeItems.zh : L.noticeItems.en;
	const money = (v: number) => formatMoney(v, data.currency, lang === "zh" ? "zh" : "en");

	return (
		<div className="doc-stage px-9 py-10 font-mono text-[#1b1e23]">
			<div className={`${border} p-8`}>
				<h1 className="text-center text-[36px] font-bold tracking-[0.08em]">
					<DT pair={L.itineraryUpper} lang={lang} />
				</h1>

				<div className="mt-5">
					<SectionChip label={L.bookingDetails} lang={lang} />
					<div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2">
						<Field label={L.orderId} lang={lang}>{data.bookingNo}</Field>
						<Field label={L.issueDate} lang={lang}>
							{formatDate(data.issueDate, "issueUpper", "en")}
						</Field>
						<Field label={L.passenger} lang={lang}>
							{data.surname}
							/
							{data.givenName}
						</Field>
						<Field label={L.gdsPnr} lang={lang}>{data.pnr}</Field>
						<Field label={L.ticketNumber} lang={lang}>
							{data.ticketNo ? `${data.ticketNo}: ${data.pnr}` : data.pnr}
						</Field>
						<Field label={L.issuedAgent} lang={lang}>{data.issuedAgent || "—"}</Field>
						<Field label={L.issuingAirline} lang={lang}>
							<TxtI en={data.issuingAirline} zh={data.issuingAirline} lang={lang} />
						</Field>
					</div>
				</div>

				<div className="mt-7">
					<SectionChip label={L.flightDetails} lang={lang} />
					<table className="mt-3 w-full border-collapse text-center text-[12.5px]">
						<thead>
							<tr>
								<th className={`${border} px-2 py-2 font-bold`}>
									<DT pair={L.date} lang={lang} />
								</th>
								<th className={`${border} px-2 py-2 font-bold`}>
									<DT pair={L.airlinePnr} lang={lang} />
								</th>
								<th className={`${border} px-2 py-2 font-bold`}>
									<DT pair={L.flightNo} lang={lang} />
								</th>
								<th className={`${border} px-2 py-2 font-bold`}>
									<DT pair={L.departureTimeTerminal} lang={lang} />
								</th>
								<th className={`${border} px-2 py-2 font-bold`}>
									<DT pair={L.arrivalTimeTerminal} lang={lang} />
								</th>
								<th className={`${border} px-2 py-2 font-bold`}>
									<DT pair={L.classUpper} lang={lang} />
								</th>
								<th className={`${border} px-2 py-2 font-bold`}>
									<DT pair={L.status} lang={lang} />
								</th>
							</tr>
						</thead>
						<tbody>
							{data.segments.map(seg => (
								<tr key={seg.id}>
									<td className={`${border} px-2 py-2 whitespace-nowrap`}>
										<DD iso={seg.depart.date} variant="dashed" lang={lang} />
									</td>
									<td className={`${border} px-2 py-2`}>{data.pnr}</td>
									<td className={`${border} px-2 py-2 font-semibold`}>{seg.flightNo}</td>
									<td className={`${border} p-0`}>
										<EndpointCell seg={seg} which="depart" lang={lang} />
									</td>
									<td className={`${border} p-0`}>
										<EndpointCell seg={seg} which="arrive" lang={lang} />
									</td>
									<td className={`${border} px-2 py-2`}>
										<TxtI en={seg.cabin} zh={seg.cabinZh} lang={lang} />
									</td>
									<td className={`${border} px-2 py-2 font-semibold`}>
										<DT pair={L.statusOk} lang={lang} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="mt-7">
					<SectionChip label={L.paymentDetails} lang={lang} />
					<div className="mt-4 space-y-1.5 text-[14px]">
						<div className="whitespace-nowrap">
							<DT pair={L.fare} lang={lang} inline />
							{" "}
							<span className="font-semibold">{money(data.fare)}</span>
						</div>
						<div className="whitespace-nowrap">
							<DT pair={L.tax} lang={lang} inline />
							{" "}
							<span className="font-semibold">{money(data.taxes)}</span>
						</div>
						<div className="whitespace-nowrap">
							<DT pair={L.total} lang={lang} inline />
							{" "}
							<span className="font-bold">{money(data.totalAmount)}</span>
						</div>
					</div>
				</div>

				<div className="mt-7">
					<SectionChip label={L.notice} lang={lang} />
					<ul className="mt-4 space-y-2.5 text-[11.5px] leading-relaxed">
						{notices.map((text, i) => (
							<li key={i} className="flex gap-2 text-justify">
								<span className="shrink-0">•</span>
								<span>
									{text}
									{lang === "bi" && (
										<span className="mt-1 block text-[10.5px] text-[#5c6370]">
											{L.noticeItems.zh[i]}
										</span>
									)}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="mt-6 text-center text-[15px] font-semibold">
				1/
				{Math.max(1, data.segments.length)}
			</div>
		</div>
	);
}
