import type { HotelData, IdMode } from "../../itinerary/types";
import type { ErrorMap } from "../../itinerary/validate";
import { useTranslation } from "react-i18next";
import {
	Checkbox,
	Field,
	SectionCard,
	SegmentedControl,
	TextAreaInput,
	TextInput,
} from "../ui/controls";

interface HotelFormProps {
	data: HotelData
	errors: ErrorMap
	update: (patch: Partial<HotelData>) => void
	regenerateIds: () => void
}

export default function HotelForm({ data, errors, update, regenerateIds }: HotelFormProps) {
	const { t } = useTranslation();
	const f = (k: string) => t(`hotel.field.${k}` as never);
	const err = (path: string) =>
		errors[path] ? t(`validation.${errors[path]}` as never) : undefined;
	const num = (value: string) => {
		const n = Number(value);
		return Number.isFinite(n) ? n : 0;
	};

	return (
		<>
			<SectionCard title={t("hotel.section.order")}>
				<div className="space-y-3">
					<div className="flex flex-wrap items-center justify-between gap-2">
						<SegmentedControl<IdMode>
							value={data.idMode}
							onChange={v => update({ idMode: v })}
							size="sm"
							options={[
								{ value: "auto", label: t("id.auto") },
								{ value: "manual", label: t("id.manual") },
							]}
						/>
						<button
							type="button"
							onClick={regenerateIds}
							className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 dark:bg-brand-950/60 dark:text-brand-300"
						>
							<svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
							</svg>
							{t("id.regenerate")}
						</button>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<Field label={f("confirmationNo")} required error={err("confirmationNo")}>
							<TextInput
								value={data.confirmationNo}
								readOnly={data.idMode === "auto"}
								invalid={!!err("confirmationNo")}
								className={data.idMode === "auto" ? "bg-slate-50 font-mono text-xs dark:bg-slate-800" : "font-mono"}
								onChange={e => update({ confirmationNo: e.target.value.toUpperCase() })}
							/>
						</Field>
						<Field label={f("bookingNo")} required error={err("bookingNo")}>
							<TextInput
								value={data.bookingNo}
								readOnly={data.idMode === "auto"}
								invalid={!!err("bookingNo")}
								className={data.idMode === "auto" ? "bg-slate-50 font-mono text-xs dark:bg-slate-800" : "font-mono"}
								onChange={e => update({ bookingNo: e.target.value })}
							/>
						</Field>
						<Field label={f("brand")} className="col-span-2">
							<TextInput value={data.brand} onChange={e => update({ brand: e.target.value })} />
						</Field>
					</div>
				</div>
			</SectionCard>

			<SectionCard title={t("hotel.section.property")}>
				<div className="grid grid-cols-2 gap-3">
					<Field label={f("name")} required error={err("name")} className="col-span-2">
						<TextInput value={data.name} invalid={!!err("name")} onChange={e => update({ name: e.target.value })} />
					</Field>
					<Field label={f("address")} className="col-span-2">
						<TextAreaInput rows={2} value={data.address} onChange={e => update({ address: e.target.value })} />
					</Field>
					<Field label={f("phone")}>
						<TextInput value={data.phone} inputMode="tel" onChange={e => update({ phone: e.target.value })} />
					</Field>
					<Field label={f("photo")} hint={f("photoHint")}>
						<TextInput value={data.photo} onChange={e => update({ photo: e.target.value })} />
					</Field>
				</div>
			</SectionCard>

			<SectionCard title={t("hotel.section.stay")}>
				<div className="grid grid-cols-2 gap-3">
					<Field label={f("checkIn")} required error={err("checkIn")}>
						<TextInput type="date" value={data.checkIn} invalid={!!err("checkIn")} onChange={e => update({ checkIn: e.target.value })} />
					</Field>
					<Field label={f("checkOut")} required error={err("checkOut")}>
						<TextInput type="date" value={data.checkOut} invalid={!!err("checkOut")} onChange={e => update({ checkOut: e.target.value })} />
					</Field>
					<Field label={f("checkInTime")}>
						<TextInput value={data.checkInTime} onChange={e => update({ checkInTime: e.target.value })} />
					</Field>
					<Field label={f("checkOutTime")}>
						<TextInput value={data.checkOutTime} onChange={e => update({ checkOutTime: e.target.value })} />
					</Field>
					<Field label={f("rooms")} error={err("rooms")}>
						<TextInput type="number" min={1} value={data.rooms} invalid={!!err("rooms")} onChange={e => update({ rooms: num(e.target.value) })} />
					</Field>
					<Field label={f("nights")} error={err("nights")}>
						<TextInput type="number" min={1} value={data.nights} invalid={!!err("nights")} onChange={e => update({ nights: num(e.target.value) })} />
					</Field>
				</div>
			</SectionCard>

			<SectionCard title={t("hotel.section.room")}>
				<div className="grid grid-cols-2 gap-3">
					<Field label={f("roomType")} className="col-span-2">
						<TextInput value={data.roomType} onChange={e => update({ roomType: e.target.value })} />
					</Field>
					<Field label={f("guests")} className="col-span-2">
						<TextInput value={data.guests} onChange={e => update({ guests: e.target.value })} />
					</Field>
					<Field label={f("occupancy")}>
						<TextInput value={data.occupancy} onChange={e => update({ occupancy: e.target.value })} />
					</Field>
					<Field label={f("occupancyZh")}>
						<TextInput value={data.occupancyZh} onChange={e => update({ occupancyZh: e.target.value })} />
					</Field>
					<Field label={f("bedInfo")}>
						<TextInput value={data.bedInfo} onChange={e => update({ bedInfo: e.target.value })} />
					</Field>
					<Field label={f("bedInfoZh")}>
						<TextInput value={data.bedInfoZh} onChange={e => update({ bedInfoZh: e.target.value })} />
					</Field>
					<Field label={f("meals")}>
						<TextInput value={data.meals} onChange={e => update({ meals: e.target.value })} />
					</Field>
					<Field label={f("mealsZh")}>
						<TextInput value={data.mealsZh} onChange={e => update({ mealsZh: e.target.value })} />
					</Field>
				</div>
			</SectionCard>

			<SectionCard title={t("hotel.section.price")}>
				<div className="space-y-3">
					<div className="grid grid-cols-2 gap-3">
						<Field label={f("prepay")} error={err("prepay")}>
							<TextInput type="number" min={0} step="0.01" value={data.prepay} invalid={!!err("prepay")} onChange={e => update({ prepay: num(e.target.value) })} />
						</Field>
						<div className="flex items-end pb-1">
							<Checkbox label={f("paid")} checked={data.paid} onChange={v => update({ paid: v })} />
						</div>
					</div>
					<Field label={f("prepayIncludes")}>
						<TextAreaInput rows={2} value={data.prepayIncludes} onChange={e => update({ prepayIncludes: e.target.value })} />
					</Field>
					<Field label={f("atHotel")}>
						<TextInput value={data.atHotel} onChange={e => update({ atHotel: e.target.value })} />
					</Field>
					<Field label={f("atHotelIncludes")}>
						<TextAreaInput rows={2} value={data.atHotelIncludes} onChange={e => update({ atHotelIncludes: e.target.value })} />
					</Field>
				</div>
			</SectionCard>

			<SectionCard title={t("hotel.field.amenities")}>
				<TextAreaInput rows={3} value={data.amenities} onChange={e => update({ amenities: e.target.value })} />
			</SectionCard>

			<SectionCard title={t("hotel.section.cancel")}>
				<div className="grid grid-cols-2 gap-3">
					<Field label={f("cancelFreeBefore")}>
						<TextInput value={data.cancelFreeBefore} onChange={e => update({ cancelFreeBefore: e.target.value })} />
					</Field>
					<Field label={f("cancelPenaltyAfter")}>
						<TextInput value={data.cancelPenaltyAfter} onChange={e => update({ cancelPenaltyAfter: e.target.value })} />
					</Field>
					<Field label={f("penaltyFee")}>
						<TextInput value={data.penaltyFee} onChange={e => update({ penaltyFee: e.target.value })} />
					</Field>
					<Field label={f("noShow")}>
						<TextInput value={data.noShow} onChange={e => update({ noShow: e.target.value })} />
					</Field>
				</div>
			</SectionCard>

			<SectionCard title={t("hotel.section.contact")}>
				<TextAreaInput rows={3} value={data.contacts} onChange={e => update({ contacts: e.target.value })} />
			</SectionCard>
		</>
	);
}
