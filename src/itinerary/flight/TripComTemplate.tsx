import type { DocLang, FlightData, FlightSegment } from "../types";
import { L } from "../doc-labels";
import { formatDuration, formatIssueDateTime, formatMoney } from "../format";
import {
	BirdIcon,
	C,
	ChatIcon,
	DD,
	DottedDivider,
	DT,
	IT,
	Money,
	PlaneMark,
	TxtI,
} from "../shared";

function legPair(segments: FlightSegment[], lang: DocLang) {
	const first = segments[0]!.depart;
	const last = segments[segments.length - 1]!.arrive;
	return `${first.code} ${lang === "zh" ? first.cityZh || first.city : first.city} → ${last.code} ${lang === "zh" ? last.cityZh || last.city : last.city}`;
}

function TimelineNode({
	date,
	time,
	code,
	airport,
	airportZh,
	terminal,
	lang,
	dateAccent,
	isLast,
}: {
	date: string
	time: string
	code: string
	airport: string
	airportZh: string
	terminal: string
	lang: DocLang
	dateAccent?: boolean
	isLast?: boolean
}) {
	return (
		<div className="relative flex">
			{/* time column */}
			<div className="w-[78px] shrink-0 pt-0.5">
				<div className="text-[15px] font-semibold leading-tight text-[#1f2329]">
					{time}
				</div>
				{dateAccent && (
					<div className="text-[12px] font-medium leading-tight" style={{ color: C.tripOrange }}>
						<DD iso={date} variant="monthDay" lang={lang} />
					</div>
				)}
			</div>
			{/* rail + dot */}
			<div className="relative mr-3 w-4 shrink-0">
				{!isLast && (
					<div
						className="absolute left-1/2 top-[14px] h-[calc(100%+14px)] w-0 -translate-x-1/2"
						style={{ borderLeft: `2px dashed ${C.line}` }}
					/>
				)}
				<div
					className="absolute left-1/2 top-[5px] h-[9px] w-[9px] -translate-x-1/2 rounded-full border-2 bg-white"
					style={{ borderColor: "#b9bec6" }}
				/>
			</div>
			{/* airport */}
			<div className="pb-7">
				<div className="text-[14px] leading-snug">
					<span className="font-semibold">{code}</span>
					<span className="ml-2 font-medium">
						<TxtI en={airport} zh={airportZh} lang={lang} />
					</span>
					<span className="ml-1.5 text-[#646a73]">{terminal}</span>
				</div>
			</div>
		</div>
	);
}

function SegmentBlock({ seg, lang }: { seg: FlightSegment, lang: DocLang }) {
	const overnight = seg.depart.date !== seg.arrive.date;
	return (
		<div className="flex gap-2">
			{/* timeline */}
			<div className="relative min-w-0 flex-1">
				<TimelineNode
					date={seg.depart.date}
					time={seg.depart.time}
					code={seg.depart.code}
					airport={seg.depart.airport}
					airportZh={seg.depart.airportZh}
					terminal={seg.depart.terminal}
					lang={lang}
				/>
				{/* duration + transfer between the two nodes */}
				<div className="flex">
					<div className="w-[78px] shrink-0 -mt-5 pl-0.5 text-[12px] text-[#646a73]">
						{formatDuration(seg.durationMin, lang === "zh" ? "zh" : "en")}
					</div>
					<div className="w-4 shrink-0" />
				</div>
				<TimelineNode
					date={seg.arrive.date}
					time={seg.arrive.time}
					code={seg.arrive.code}
					airport={seg.arrive.airport}
					airportZh={seg.arrive.airportZh}
					terminal={seg.arrive.terminal}
					lang={lang}
					dateAccent={overnight}
					isLast={!seg.transfer}
				/>
				{seg.transfer && (
					<div className="flex pb-6">
						<div className="w-[78px] shrink-0" />
						<div className="relative mr-3 w-4 shrink-0">
							<div
								className="absolute left-1/2 top-[-22px] h-[30px] w-0 -translate-x-1/2"
								style={{ borderLeft: `2px dashed ${C.line}` }}
							/>
							<div
								className="absolute left-1/2 top-[6px] h-[9px] w-[9px] -translate-x-1/2 rounded-full border-2 bg-white"
								style={{ borderColor: "#b9bec6" }}
							/>
						</div>
						<div className="text-[13px] leading-relaxed">
							<div className="font-semibold text-[#1f2329]">
								<DT pair={L.transferIn} lang={lang} />
								<span className="ml-1 font-semibold">
									<TxtI en={seg.transfer.city} zh={seg.transfer.cityZh} lang={lang} />
								</span>
								<span className="ml-1.5 font-semibold">
									{formatDuration(seg.transfer.durationMin, lang === "zh" ? "zh" : "en")}
								</span>
							</div>
							<div className="flex flex-wrap items-center gap-x-2 font-medium" style={{ color: C.tripOrange }}>
								<span>⏱</span>
								<span>
									<DT pair={L.overnightTransfer} lang={lang} />
								</span>
								{seg.transfer.recheckBaggage && (
									<>
										<span className="text-[#1f2329]">|</span>
										<span className="underline underline-offset-2">
											<DT pair={L.recheckBaggage} lang={lang} />
										</span>
									</>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
			{/* airline meta */}
			<div className="w-[268px] shrink-0 pt-1 text-[13px] leading-relaxed">
				<div className="flex items-center gap-1.5 font-semibold text-[#1f2329]">
					<PlaneMark flightNo={seg.flightNo} />
					<span>
						<TxtI en={seg.airline} zh={seg.airlineZh} lang={lang} />
						{" "}
						{seg.flightNo}
					</span>
					<ChatIcon className="ml-0.5" />
				</div>
				<div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#1f2329]">
					<span className="min-w-0">
						<TxtI en={seg.cabin} zh={seg.cabinZh} lang={lang} />
					</span>
					{seg.aircraft && <span className="min-w-0">{seg.aircraft}</span>}
					<BirdIcon />
				</div>
			</div>
		</div>
	);
}

function PriceRow({ label, value, lang: _lang }: { label: React.ReactNode, value: string, lang: DocLang }) {
	return (
		<div className="flex items-baseline justify-between py-1.5 text-[13.5px]">
			<span className="text-[#3d4450]">{label}</span>
			<span className="tabular-nums text-[#1f2329]">{value}</span>
		</div>
	);
}

export default function TripComTemplate({ data, lang }: { data: FlightData, lang: DocLang }) {
	const segments = data.segments;
	const outbound = segments.slice(0, 1);
	const returnLegs = segments.slice(1);
	const isZh = lang === "zh";
	const genderLabel = data.gender === "male" ? L.male : L.female;
	const typeLabel = data.passengerType === "adult" ? L.adult : L.child;

	return (
		<div className="doc-stage px-12 py-12 font-sans text-[14px] text-[#1f2329]">
			{/* header */}
			<div className="whitespace-nowrap text-[13px] text-[#3d4450]">
				<DT pair={L.bookingNo} lang={lang} inline />
				{" "}
				<span className="font-semibold text-[#1f2329]">{data.bookingNo}</span>
			</div>

			<h1 className="mt-9 text-[28px] font-bold leading-tight">
				<DT pair={L.flightDetails} lang={lang} />
			</h1>
			<div className="mt-2 text-[13px] text-[#646a73]">
				<DT pair={L.allTimesLocal} lang={lang} />
			</div>

			{/* outbound */}
			<div className="mt-6">
				<div className="mb-3 flex flex-wrap items-baseline gap-x-3 text-[15px]">
					<span className="w-[68px] text-[12px] font-semibold uppercase tracking-wide text-[#8f959e]">
						<DT pair={L.depart} lang={lang} />
					</span>
					<span className="font-bold">
						<DD iso={outbound[0]!.depart.date} variant="weekday" lang={lang} />
					</span>
					<span className="font-bold">{legPair(outbound, lang === "zh" ? "zh" : "en")}</span>
				</div>
				<SegmentBlock seg={outbound[0]!} lang={lang} />
			</div>

			{/* return */}
			{data.tripKind === "roundtrip" && returnLegs.length > 0 && (
				<>
					<DottedDivider />
					<div>
						<div className="mb-3 flex flex-wrap items-baseline gap-x-3 text-[15px]">
							<span className="w-[68px] text-[12px] font-semibold uppercase tracking-wide text-[#8f959e]">
								<DT pair={L.returnLeg} lang={lang} />
							</span>
							<span className="font-bold">
								<DD iso={returnLegs[0]!.depart.date} variant="weekday" lang={lang} />
							</span>
							<span className="font-bold">{legPair(returnLegs, lang === "zh" ? "zh" : "en")}</span>
						</div>
						{returnLegs.map(seg => <SegmentBlock key={seg.id} seg={seg} lang={lang} />)}
					</div>
				</>
			)}

			<DottedDivider />

			{/* passenger */}
			<h2 className="text-[22px] font-bold">
				<DT pair={L.passengerInfo} lang={lang} />
			</h2>
			<div className="mt-7 text-[14px]">
				<div className="flex flex-wrap items-baseline gap-x-2 font-semibold">
					<span className="whitespace-nowrap">
						1:
						{" "}
						{data.givenName}
						{" "}
						<span className="font-normal text-[#3d4450]">
							<IT pair={L.givenNames} lang={lang} />
						</span>
					</span>
					<span className="whitespace-nowrap">
						{data.surname}
						{" "}
						<span className="font-normal text-[#3d4450]">
							<IT pair={L.surname} lang={lang} />
						</span>
					</span>
				</div>
				<div className="mt-4 space-y-2">
					<div className="flex">
						<div className="w-60 text-[#3d4450]">
							<DT pair={L.nationality} lang={lang} />
						</div>
						<div>{isZh ? data.nationalityZh || data.nationality : data.nationality}</div>
					</div>
					<div className="flex">
						<div className="w-60 text-[#3d4450]">
							<DT pair={L.genderLabel} lang={lang} />
						</div>
						<div className="whitespace-nowrap">
							<DT pair={genderLabel} lang={lang} inline />
							{" "}
							|
							{" "}
							<DT pair={typeLabel} lang={lang} inline />
						</div>
					</div>
					<div className="flex">
						<div className="w-60 text-[#3d4450]">
							<DT pair={L.dobLabel} lang={lang} />
						</div>
						<div>
							<DD iso={data.dob} variant="full" lang={lang} />
						</div>
					</div>
				</div>
			</div>

			{/* contact */}
			<h2 className="mt-12 text-[22px] font-bold">
				<DT pair={L.contactInfo} lang={lang} />
			</h2>
			<div className="mt-6">
				<div className="text-[15px] font-bold">
					{data.givenName}
					{" "}
					{data.surname}
				</div>
				<div className="mt-5 flex">
					<div className="w-24 text-[#3d4450]">
						<DT pair={L.phone} lang={lang} />
					</div>
					<div>{data.phone}</div>
				</div>
				<div className="mt-3 flex">
					<div className="w-24 text-[#3d4450]">
						<DT pair={L.email} lang={lang} />
					</div>
					<div>{data.email}</div>
				</div>
			</div>

			{/* price */}
			<div className="mt-14">
				<div className="flex items-baseline justify-between border-b border-[#ebedf0] pb-3">
					<span className="text-[17px] font-bold">
						<DT pair={L.totalAmount} lang={lang} />
					</span>
					<span className="text-[20px] font-bold" style={{ color: C.tripBlue }}>
						<Money amount={data.totalAmount} currency={data.currency} lang={lang} />
					</span>
				</div>
				<div className="flex items-baseline justify-between pt-3">
					<div>
						<div className="text-[15px] font-bold">
							<DT pair={L.bookingTotal} lang={lang} />
						</div>
						<div className="mt-0.5 text-[12px] text-[#646a73]">
							{data.issueDateTime && formatIssueDateTime(data.issueDateTime, lang === "zh" ? "zh" : "en")}
						</div>
					</div>
					<span className="text-[16px] font-bold tabular-nums">
						<Money amount={data.totalAmount} currency={data.currency} lang={lang} />
					</span>
				</div>

				<div className="mt-7 max-w-[360px]">
					<PriceRow
						label={<DT pair={L.adults} lang={lang} />}
						value={`${formatMoney(data.adultPrice, data.currency, lang === "zh" ? "zh" : "en")} × 1`}
						lang={lang}
					/>
					<PriceRow
						label={<DT pair={L.ticketFare} lang={lang} />}
						value={`${formatMoney(data.fare, data.currency, lang === "zh" ? "zh" : "en")} × 1`}
						lang={lang}
					/>
					<PriceRow
						label={<DT pair={L.taxesFees} lang={lang} />}
						value={`${formatMoney(data.taxes, data.currency, lang === "zh" ? "zh" : "en")} × 1`}
						lang={lang}
					/>
					<PriceRow
						label={<DT pair={L.promoCode} lang={lang} />}
						value={`${formatMoney(data.promo, data.currency, lang === "zh" ? "zh" : "en")} × 4`}
						lang={lang}
					/>
					<PriceRow
						label={<DT pair={L.smoothGuarantee} lang={lang} />}
						value={`${formatMoney(data.guarantee, data.currency, lang === "zh" ? "zh" : "en")} × 1`}
						lang={lang}
					/>
					<PriceRow
						label={<DT pair={L.tripFlex} lang={lang} />}
						value={`${formatMoney(data.tripFlex, data.currency, lang === "zh" ? "zh" : "en")} × 1`}
						lang={lang}
					/>
				</div>
			</div>
		</div>
	);
}
