import type { DocLang, FlightData } from "../types";
import { cn, splitLines } from "../../lib/utils";
import { L } from "../doc-labels";
import { formatDateTime } from "../format";
import { DD, DT, QunarBrand, TxtI } from "../shared";

const CELL = "border border-[#d9dde4] px-3 py-3 align-middle";
const HEAD = `${CELL} bg-[#f4f5f7] text-center font-bold text-[#1f2329]`;

function SectionTitle({ children }: { children: React.ReactNode }) {
	return (
		<h2 className="mt-10 text-[21px] font-bold tracking-wide">{children}</h2>
	);
}

export default function QunarTemplate({ data, lang }: { data: FlightData, lang: DocLang }) {
	const seg = data.segments[0];
	const fullName = `${data.surname}/${data.givenName}`;
	const notes = splitLines(data.notes);
	const isZh = lang === "zh";
	const mono = "font-mono";

	const routeText = seg
		? `${isZh ? (seg.depart.cityZh || seg.depart.city) : seg.depart.city} (${seg.depart.code})–${isZh ? (seg.arrive.cityZh || seg.arrive.city) : seg.arrive.city} (${seg.arrive.code})`
		: "";

	return (
		<div className={`doc-stage px-14 py-12 ${mono} text-[14.5px] leading-relaxed text-[#2b2f36]`}>
			{/* brand */}
			<div className="border-b-[3px] border-[#a8adb5] pb-3">
				<QunarBrand />
			</div>

			{/* title */}
			<h1 className="mt-12 text-center text-[42px] font-bold tracking-[0.12em]">
				<DT pair={L.tripItinerary} lang={lang} />
			</h1>

			{/* welcome */}
			<p className="mt-8 text-justify text-[15px]">
				<DT pair={L.welcome1} lang={lang} inline />
				{" "}
				<span
					className={cn("font-semibold", lang === "bi" && "inline-flex items-baseline whitespace-nowrap")}
					style={{ color: "#13a3c2" }}
				>
					<DT pair={L.orderNumber} lang={lang} inline />
					{"\u00A0"}
					{data.bookingNo}
				</span>
				{" "}
				<DT pair={L.welcome2} lang={lang} inline />
			</p>

			{/* route */}
			{seg && (
				<div className="mt-9 text-center text-[23px] font-semibold leading-snug">
					{routeText}
					<span className="mx-2">
						<DT pair={L.oneWayFlight} lang={lang} />
					</span>
				</div>
			)}

			{/* passenger table */}
			<SectionTitle>
				<DT pair={L.passengerInformation} lang={lang} />
			</SectionTitle>
			<table className="mt-3 w-full border-collapse">
				<thead>
					<tr className="text-[14px]">
						<th className={HEAD}><DT pair={L.passengerName} lang={lang} /></th>
						<th className={`${HEAD} w-[12%]`}><DT pair={L.gender} lang={lang} /></th>
						<th className={`${HEAD} w-[16%]`}><DT pair={L.birthday} lang={lang} /></th>
						<th className={`${HEAD} w-[18%]`}><DT pair={L.passportNumber} lang={lang} /></th>
						<th className={`${HEAD} w-[18%]`}><DT pair={L.idExpiration} lang={lang} /></th>
					</tr>
				</thead>
				<tbody>
					<tr className="text-center text-[14.5px]">
						<td className={CELL}>{fullName}</td>
						<td className={CELL}>
							<DT pair={data.gender === "male" ? L.male : L.female} lang={lang} />
						</td>
						<td className={CELL}>
							<DD iso={data.dob} variant="numeric" lang={lang} />
						</td>
						<td className={CELL}>{data.passport}</td>
						<td className={CELL}>
							<DD iso={data.passportExpiry} variant="numeric" lang={lang} />
						</td>
					</tr>
				</tbody>
			</table>

			{/* flight table */}
			{seg && (
				<>
					<SectionTitle>
						<DT pair={L.flightInformation} lang={lang} />
					</SectionTitle>
					<table className="mt-3 w-full table-fixed border-collapse">
						<colgroup>
							<col className="w-[22%]" />
							<col className="w-[10%]" />
							<col className="w-[10%]" />
							<col className="w-[17%]" />
							<col className="w-[17%]" />
							<col className="w-[12%]" />
							<col className="w-[12%]" />
						</colgroup>
						<thead>
							<tr className="text-[14px]">
								<th className={`${HEAD} [overflow-wrap:anywhere]`} rowSpan={2}>
									<DT pair={L.departureArrival} lang={lang} />
								</th>
								<th className={HEAD} rowSpan={2}>
									<DT pair={L.flight} lang={lang} />
								</th>
								<th className={HEAD} rowSpan={2}>
									<DT pair={L.class} lang={lang} />
								</th>
								<th className={HEAD} rowSpan={2}>
									<DT pair={L.departureTime} lang={lang} />
								</th>
								<th className={HEAD} rowSpan={2}>
									<DT pair={L.arrivalTime} lang={lang} />
								</th>
								<th className={`${HEAD} border-l-0`} colSpan={2}>
									<DT pair={L.terminal} lang={lang} />
								</th>
							</tr>
							<tr className="text-[14px]">
								<th className={`${HEAD} border-t-0`}><DT pair={L.takeoff} lang={lang} /></th>
								<th className={`${HEAD} border-t-0`}><DT pair={L.arrival} lang={lang} /></th>
							</tr>
						</thead>
						<tbody>
							<tr className="text-center text-[14.5px]">
								<td className={CELL}>
									{isZh ? seg.depart.cityZh : seg.depart.city}
									{" "}
									(
									{seg.depart.code}
									)
									–
									{isZh ? seg.arrive.cityZh : seg.arrive.city}
									{" "}
									(
									{seg.arrive.code}
									)
								</td>
								<td className={CELL}>{seg.flightNo}</td>
								<td className={CELL}>
									<TxtI en={seg.cabin} zh={seg.cabinZh} lang={lang} />
								</td>
								<td className={`${CELL} leading-tight`}>
									{formatDateTime(seg.depart.date, seg.depart.time, isZh ? "zh" : "en")}
								</td>
								<td className={`${CELL} leading-tight`}>
									{formatDateTime(seg.arrive.date, seg.arrive.time, isZh ? "zh" : "en")}
								</td>
								<td className={CELL}>{seg.depart.terminal}</td>
								<td className={CELL}>{seg.arrive.terminal}</td>
							</tr>
						</tbody>
					</table>
				</>
			)}

			{/* notes */}
			<SectionTitle>
				<DT pair={L.otherNotes} lang={lang} />
			</SectionTitle>
			<div className="mt-5 space-y-5 text-[14px] text-[#5c6370]">
				{notes.length === 0 && <span>—</span>}
				{notes.map((line, i) => (
					<p key={i} className="text-justify indent-7">
						{i + 1}
						.
						{line}
					</p>
				))}
			</div>

			{/* issue date */}
			<div className="mt-10 text-right text-[15px] text-[#5c6370]">
				<DD iso={data.issueDate} variant="numeric" lang={lang} />
			</div>
		</div>
	);
}
