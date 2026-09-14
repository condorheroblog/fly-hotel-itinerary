import type { DocLang, HotelData } from "../types";
import { splitAmenities, splitLines } from "../../lib/utils";
import { L } from "../doc-labels";
import { formatMoneyCode } from "../format";
import {
	C,
	CtripBrand,
	DD,
	DT,
	TxtI,
} from "../shared";

function SectionHeading({
	children,
	lang: _lang,
}: {
	children: React.ReactNode
	lang?: DocLang
}) {
	return (
		<h3 className="mb-4 flex items-center gap-2.5 text-[18px] font-bold text-[#13294b]">
			<span className="inline-block h-[18px] w-[5px] rounded-full" style={{ background: C.ctripBlue }} />
			{children}
		</h3>
	);
}

function InfoLine({
	label,
	children,
	lang,
}: {
	label: { en: string, zh: string }
	children: React.ReactNode
	lang: DocLang
}) {
	return (
		<div className="mb-4 last:mb-0">
			<div className="text-[12.5px] font-medium uppercase tracking-wide text-[#8a94a6]">
				<DT pair={label} lang={lang} />
			</div>
			<div className="mt-1 text-[14.5px] leading-relaxed text-[#1f2937]">
				{children}
			</div>
		</div>
	);
}

export default function BannerVoucherTemplate({ data, lang }: { data: HotelData, lang: DocLang }) {
	const prepayIncludes = splitLines(data.prepayIncludes);
	const atHotelIncludes = splitLines(data.atHotelIncludes);
	const amenities = splitAmenities(data.amenities);
	const contacts = splitLines(data.contacts);
	const isZh = lang === "zh";

	return (
		<div className="doc-stage overflow-hidden rounded-[10px] font-sans text-[#1f2937]">
			{/* blue header band */}
			<div
				className="flex items-start justify-between gap-6 px-10 py-7 text-white"
				style={{ background: "linear-gradient(120deg,#1770cf 0%,#0f59ad 60%,#0b4b94 100%)" }}
			>
				<CtripBrand size="lg" inverted />
				<div className="text-right">
					<div className="text-[17px] font-medium text-white/90">
						<DT pair={L.checkInVoucher} lang={lang} subClassName="text-white/70" />
					</div>
					<div className="mt-1 flex items-baseline justify-end gap-2 whitespace-nowrap text-white/85">
						<DT pair={L.confirmationNo} lang={lang} inline subClassName="text-white/65" />
						<span className="text-[22px] font-extrabold tracking-wide text-white">
							{data.confirmationNo}
						</span>
					</div>
					<div className="mt-0.5 whitespace-nowrap text-right text-[13px] text-white/80">
						<DT pair={L.bookingNoShort} lang={lang} inline subClassName="text-white/65" />
						{" "}
						<span>{data.bookingNo}</span>
					</div>
				</div>
			</div>

			{/* photo banner with hotel name overlay */}
			<div className="relative h-[228px] w-full">
				{data.photo
					? (
						<img
							src={data.photo}
							crossOrigin="anonymous"
							alt={data.name}
							className="h-full w-full object-cover"
						/>
					)
					: <div className="h-full w-full bg-[#dbe7f4]" />}
				<div
					className="absolute inset-x-0 bottom-0 px-9 pb-5 pt-16 text-white"
					style={{ background: "linear-gradient(to top, rgba(10,25,47,.88), rgba(10,25,47,0))" }}
				>
					<h2 className="text-[26px] font-extrabold leading-tight drop-shadow">
						{data.name}
					</h2>
					<div className="mt-1.5 text-[13px] leading-relaxed text-white/85">
						{data.address}
					</div>
					<div className="text-[13px] text-white/85">{data.phone}</div>
				</div>
			</div>

			{/* stay strip */}
			<div className="grid grid-cols-3 divide-x divide-[#dbeafe] bg-[#f0f7ff] px-4 py-6 text-center">
				{[
					{ label: L.checkIn, iso: data.checkIn, rule: data.checkInTime },
					{ label: L.checkOut, iso: data.checkOut, rule: data.checkOutTime },
				].map(col => (
					<div key={col.label.en} className="px-3">
						<div className="text-[12.5px] font-semibold uppercase tracking-wider" style={{ color: C.ctripBlue }}>
							<DT pair={col.label} lang={lang} />
						</div>
						<div className="mt-1.5 text-[24px] font-extrabold leading-tight text-[#102a52]">
							<DD iso={col.iso} variant="full" lang={lang} />
						</div>
						<div className="mt-0.5 text-[12.5px] text-[#64748b]">
							<DD iso={col.iso} variant="weekday" lang={lang} />
						</div>
						<div className="mt-1 text-[13.5px] font-medium text-[#334155]">{col.rule}</div>
						<div className="text-[12px] text-[#94a3b8]">
							<DT pair={L.hotelLocalTime} lang={lang} />
						</div>
					</div>
				))}
				<div className="flex items-center justify-center gap-6 px-3">
					<span>
						<span className="block text-[12.5px] font-semibold uppercase tracking-wider" style={{ color: C.ctripBlue }}>
							<DT pair={L.rooms} lang={lang} />
						</span>
						<span className="mt-1 block text-[24px] font-extrabold text-[#102a52]">{data.rooms}</span>
					</span>
					<span className="text-[22px] font-light text-[#b6c6dd]">/</span>
					<span>
						<span className="block text-[12.5px] font-semibold uppercase tracking-wider" style={{ color: C.ctripBlue }}>
							<DT pair={L.nights} lang={lang} />
						</span>
						<span className="mt-1 block text-[24px] font-extrabold text-[#102a52]">{data.nights}</span>
					</span>
				</div>
			</div>

			<div className="px-10 py-8">
				{/* room + price */}
				<div className="grid grid-cols-2 gap-10">
					<div>
						<div className="mb-4 rounded-lg bg-[#eef5fd] px-4 py-3 text-[20px] font-bold leading-snug" style={{ color: C.ctripDeep }}>
							{data.roomType}
						</div>
						<InfoLine label={L.guestNames} lang={lang}>{data.guests}</InfoLine>
						<InfoLine label={L.occupancy} lang={lang}>
							<TxtI en={data.occupancy} zh={data.occupancyZh} lang={lang} />
						</InfoLine>
						<InfoLine label={L.roomInfo} lang={lang}>
							<TxtI en={data.bedInfo} zh={data.bedInfoZh} lang={lang} />
						</InfoLine>
						<InfoLine label={L.meals} lang={lang}>
							<TxtI en={data.meals} zh={data.mealsZh} lang={lang} />
						</InfoLine>
					</div>

					<div>
						<SectionHeading lang={lang}>
							<DT pair={L.priceDetails} lang={lang} />
						</SectionHeading>
						<div className="rounded-lg border border-[#d8e8fa] bg-[#f6faff] p-5">
							<div className="flex items-center justify-between">
								<span className="text-[13px] text-[#64748b]">
									<DT pair={L.prepayOnline} lang={lang} />
								</span>
								{data.paid && (
									<span className="rounded-full px-2.5 py-[2px] text-[11.5px] font-bold text-white" style={{ background: C.ctripBlue }}>
										<DT pair={L.paid} lang={lang} />
									</span>
								)}
							</div>
							<div className="mt-1 text-[24px] font-extrabold" style={{ color: C.ctripDeep }}>
								{formatMoneyCode(data.prepay, "CNY", isZh ? "zh" : "en")}
							</div>
							{prepayIncludes.length > 0 && (
								<ul className="mt-2 space-y-0.5 text-[12.5px] text-[#64748b]">
									{prepayIncludes.map((line, i) => (
										<li key={i} className="flex gap-1.5">
											<span style={{ color: C.ctripBlue }}>✓</span>
											<span>{line}</span>
										</li>
									))}
								</ul>
							)}
							{data.atHotel && (
								<div className="mt-4 border-t border-dashed border-[#c9def5] pt-3">
									<div className="text-[12.5px] text-[#64748b]">
										<DT pair={L.payAtHotel} lang={lang} />
									</div>
									<div className="mt-0.5 text-[16px] font-bold">{data.atHotel}</div>
									{atHotelIncludes.length > 0 && (
										<ul className="mt-1 space-y-0.5 text-[12.5px] text-[#64748b]">
											{atHotelIncludes.map((line, i) => (
												<li key={i} className="flex gap-1.5">
													<span style={{ color: C.ctripBlue }}>✓</span>
													<span>{line}</span>
												</li>
											))}
										</ul>
									)}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* amenities */}
				<div className="mt-8">
					<SectionHeading lang={lang}>
						<DT pair={L.roomAmenities} lang={lang} />
					</SectionHeading>
					<div className="flex flex-wrap gap-2">
						{amenities.map((item, i) => (
							<span
								key={i}
								className="rounded-full bg-[#eaf3fe] px-3 py-1.5 text-[12.5px] font-medium"
								style={{ color: C.ctripDeep }}
							>
								{item}
							</span>
						))}
					</div>
				</div>

				{/* cancellation */}
				<div className="mt-8">
					<SectionHeading lang={lang}>
						<DT pair={L.cancellationPolicy} lang={lang} />
					</SectionHeading>
					<div className="overflow-hidden rounded-lg border border-[#e2e8f0]">
						<div className="flex items-center justify-between gap-4 bg-white px-5 py-4">
							<span className="text-[13.5px] text-[#475569]">{data.cancelFreeBefore}</span>
							<span className="shrink-0 rounded-full bg-[#e7f8ef] px-3 py-1 text-[12.5px] font-bold text-[#15803d]">
								<DT pair={L.freeCancellation} lang={lang} />
							</span>
						</div>
						<div className="flex items-center justify-between gap-4 border-t border-[#e2e8f0] bg-[#fafbfc] px-5 py-4">
							<span className="text-[13.5px] text-[#475569]">{data.cancelPenaltyAfter}</span>
							<span className="shrink-0 rounded-full bg-[#fdecec] px-3 py-1 text-[12.5px] font-bold text-[#c0392b]">
								{data.penaltyFee}
							</span>
						</div>
					</div>
					{data.noShow && (
						<p className="mt-3 text-[13px] leading-relaxed text-[#64748b]">{data.noShow}</p>
					)}
				</div>
			</div>

			{/* contact footer */}
			<div className="bg-[#f2f5f9] px-10 py-5">
				<div className="text-[13px] font-bold text-[#334155]">
					<DT pair={L.contactUs} lang={lang} />
				</div>
				<div className="mt-1.5 space-y-0.5 text-[12.5px] text-[#64748b]">
					{contacts.map((line, i) => <div key={i}>{line}</div>)}
				</div>
			</div>
		</div>
	);
}
