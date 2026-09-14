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

const labelCls = "text-[13px] text-[#7d8590]";
const valueCls = "mt-1 text-[14.5px] text-[#1f2329]";

function StayColumn({
	label,
	iso,
	timeRule,
	lang,
}: {
	label: { en: string, zh: string }
	iso: string
	timeRule: string
	lang: DocLang
}) {
	return (
		<div className="flex flex-col items-center px-4 text-center">
			<div className={labelCls}>
				<DT pair={label} lang={lang} />
			</div>
			<div className="mt-2 text-[30px] font-bold leading-tight text-[#11151a]">
				<DD iso={iso} variant="full" lang={lang} />
			</div>
			<div className="mt-1 text-[13px] text-[#7d8590]">
				<DD iso={iso} variant="weekday" lang={lang} />
			</div>
			<div className="mt-1 text-[14px] font-medium text-[#1f2329]">{timeRule}</div>
			<div className="mt-1 text-[12.5px] text-[#8f959e]">
				<DT pair={L.hotelLocalTime} lang={lang} />
			</div>
		</div>
	);
}

function FieldBlock({
	label,
	children,
}: {
	label: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<div className="mb-5 last:mb-0">
			<div className={labelCls}>{label}</div>
			<div className={valueCls}>{children}</div>
		</div>
	);
}

export default function VoucherCardTemplate({ data, lang }: { data: HotelData, lang: DocLang }) {
	const prepayIncludes = splitLines(data.prepayIncludes);
	const atHotelIncludes = splitLines(data.atHotelIncludes);
	const amenities = splitAmenities(data.amenities);
	const contacts = splitLines(data.contacts);
	const isZh = lang === "zh";

	return (
		<div className="doc-stage px-10 py-10 font-sans text-[#1f2329]">
			{/* header */}
			<div className="flex items-start justify-between gap-6">
				<CtripBrand size="lg" />
				<div className="text-right">
					<div className="text-[19px] text-[#1f2329]">
						<DT pair={L.checkInVoucher} lang={lang} />
					</div>
					<div className="mt-1.5 whitespace-nowrap text-[15.5px] font-semibold">
						<DT pair={L.confirmationNo} lang={lang} inline />
						{" "}
						<span className="text-[22px] font-bold" style={{ color: C.ctripBlue }}>
							{data.confirmationNo}
						</span>
					</div>
					<div className="mt-0.5 whitespace-nowrap text-[14.5px]">
						<DT pair={L.bookingNoShort} lang={lang} inline />
						{" "}
						<span>{data.bookingNo}</span>
					</div>
				</div>
			</div>

			{/* voucher card */}
			<div
				className="mt-4 border-[1.5px] bg-white"
				style={{ borderColor: "#98a2b3", borderRadius: "3px" }}
			>
				{/* property */}
				<div className="flex gap-5 p-5">
					{data.photo
						? (
							<img
								src={data.photo}
								alt={data.name}
								crossOrigin="anonymous"
								className="h-[128px] w-[172px] shrink-0 rounded-[3px] object-cover"
							/>
						)
						: (
							<div className="h-[128px] w-[172px] shrink-0 rounded-[3px] bg-[#eef2f7]" />
						)}
					<div className="min-w-0">
						<h2 className="text-[22px] font-bold leading-snug">{data.name}</h2>
						<div className="mt-2 text-[13.5px] leading-relaxed text-[#4b5563]">
							<div>
								<b className="font-semibold text-[#374151]">
									<TxtI en="Address:" zh="地址：" lang={lang} />
								</b>
								{" "}
								{data.address}
							</div>
							<div className="mt-1">
								<b className="font-semibold text-[#374151]">
									<TxtI en="Phone:" zh="电话：" lang={lang} />
								</b>
								{" "}
								{data.phone}
							</div>
						</div>
					</div>
				</div>

				{/* stay strip */}
				<div className="grid grid-cols-3 divide-x divide-[#e3e7ec] border-t border-[#e3e7ec] py-7">
					<StayColumn
						label={L.checkIn}
						iso={data.checkIn}
						timeRule={data.checkInTime}
						lang={lang}
					/>
					<StayColumn
						label={L.checkOut}
						iso={data.checkOut}
						timeRule={data.checkOutTime}
						lang={lang}
					/>
					<div className="flex flex-col items-center justify-center px-4">
						<div className="flex items-center gap-5">
							<span className="flex flex-col items-center">
								<span className={labelCls}>
									<DT pair={L.rooms} lang={lang} />
								</span>
								<span className="mt-2 text-[30px] font-bold leading-none">{data.rooms}</span>
							</span>
							<span className="text-[28px] font-light text-[#c3c9d2]">/</span>
							<span className="flex flex-col items-center">
								<span className={labelCls}>
									<DT pair={L.nights} lang={lang} />
								</span>
								<span className="mt-2 text-[30px] font-bold leading-none">{data.nights}</span>
							</span>
						</div>
					</div>
				</div>

				{/* price + room */}
				<div className="grid grid-cols-2 gap-x-10 border-t border-[#e3e7ec] p-8">
					{/* left: price */}
					<div className="min-w-0 break-words">
						<h3 className="mb-6 text-[20px] font-bold">
							<DT pair={L.priceDetails} lang={lang} />
						</h3>
						<div className="text-[13px] text-[#7d8590]">
							<DT pair={L.prepayOnline} lang={lang} />
						</div>
						<div className="mt-1 flex items-center gap-2.5 text-[18px] font-bold">
							{formatMoneyCode(data.prepay, "CNY", isZh ? "zh" : "en")}
							{data.paid && (
								<span
									className="rounded-[3px] border px-1.5 py-[1px] text-[12px] font-semibold"
									style={{ borderColor: C.ctripBlue, color: C.ctripBlue }}
								>
									<DT pair={L.paid} lang={lang} />
								</span>
							)}
						</div>
						{prepayIncludes.length > 0 && (
							<div className="mt-1.5 text-[13px] text-[#4b5563]">
								<div>
									<DT pair={L.includes} lang={lang} />
								</div>
								{prepayIncludes.map((line, i) => <div key={i}>{line}</div>)}
							</div>
						)}
						{data.atHotel && (
							<>
								<div className="mt-6 text-[13px] text-[#7d8590]">
									<DT pair={L.payAtHotel} lang={lang} />
								</div>
								<div className="mt-1 text-[15.5px] font-bold">{data.atHotel}</div>
								{atHotelIncludes.length > 0 && (
									<div className="mt-1.5 text-[13px] text-[#4b5563]">
										<div>
											<DT pair={L.includes} lang={lang} />
										</div>
										{atHotelIncludes.map((line, i) => <div key={i}>{line}</div>)}
									</div>
								)}
							</>
						)}
					</div>

					{/* right: room */}
					<div className="min-w-0 border-l border-[#eef0f3] pl-10">
						<h3 className="mb-6 text-[21px] font-bold leading-snug">{data.roomType}</h3>
						<FieldBlock label={<DT pair={L.guestNames} lang={lang} />}>
							{data.guests}
						</FieldBlock>
						<FieldBlock label={<DT pair={L.occupancy} lang={lang} />}>
							<TxtI en={data.occupancy} zh={data.occupancyZh} lang={lang} />
						</FieldBlock>
						<FieldBlock label={<DT pair={L.roomInfo} lang={lang} />}>
							<TxtI en={data.bedInfo} zh={data.bedInfoZh} lang={lang} />
						</FieldBlock>
						<FieldBlock label={<DT pair={L.meals} lang={lang} />}>
							<TxtI en={data.meals} zh={data.mealsZh} lang={lang} />
						</FieldBlock>
					</div>
				</div>

				{/* amenities + cancellation */}
				<div className="grid grid-cols-2 gap-x-10 border-t border-[#e3e7ec] p-8">
					<div className="min-w-0">
						<h3 className="mb-5 text-[20px] font-bold">
							<DT pair={L.roomAmenities} lang={lang} />
						</h3>
						<p className="break-words text-[13.5px] leading-[1.9] text-[#374151]">
							{amenities.map((item, i) => (
								<span key={i}>
									{item}
									{i < amenities.length - 1 && <span className="mx-1.5 text-[#9aa2b1]">·</span>}
								</span>
							))}
						</p>
					</div>
					<div className="min-w-0 border-l border-[#eef0f3] pl-10">
						<h3 className="mb-5 text-[20px] font-bold">
							<DT pair={L.cancellationPolicy} lang={lang} />
						</h3>
						<table className="w-full border-collapse text-[13.5px]">
							<thead>
								<tr>
									<th className="border border-[#d9dde4] bg-[#f7f8fa] px-3 py-2.5 text-center font-semibold">
										<DT pair={L.hotelLocalTime} lang={lang} />
									</th>
									<th className="border border-[#d9dde4] bg-[#f7f8fa] px-3 py-2.5 text-center font-semibold">
										<DT pair={L.cancellationFee} lang={lang} />
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-[#d9dde4] px-3 py-3 text-center leading-snug">
										{data.cancelFreeBefore}
									</td>
									<td className="border border-[#d9dde4] px-3 py-3 text-center">
										<DT pair={L.freeCancellation} lang={lang} />
									</td>
								</tr>
								<tr>
									<td className="border border-[#d9dde4] px-3 py-3 text-center leading-snug">
										{data.cancelPenaltyAfter}
									</td>
									<td className="border border-[#d9dde4] px-3 py-3 text-center font-medium">
										{data.penaltyFee}
									</td>
								</tr>
							</tbody>
						</table>
						{data.noShow && <p className="mt-3 text-[13px] leading-relaxed text-[#374151]">{data.noShow}</p>}
					</div>
				</div>
			</div>

			{/* contact */}
			<div className="mt-7">
				<h4 className="text-[14px] font-bold">
					<DT pair={L.contactUs} lang={lang} />
				</h4>
				<div className="mt-2 space-y-0.5 text-[13.5px] text-[#374151]">
					{contacts.map((line, i) => <div key={i}>{line}</div>)}
				</div>
			</div>
		</div>
	);
}
