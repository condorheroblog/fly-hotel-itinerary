import type {
	Endpoint,
	FlightData,
	FlightSegment,
	IdMode,
	TransferInfo,
} from "../../itinerary/types";
import type { ErrorMap } from "../../itinerary/validate";
import { useTranslation } from "react-i18next";
import {
	Checkbox,
	Field,
	SectionCard,
	SegmentedControl,
	SelectInput,
	TextAreaInput,
	TextInput,
} from "../ui/controls";

interface FlightFormProps {
	data: FlightData
	errors: ErrorMap
	update: (patch: Partial<FlightData>) => void
	updateSegment: (id: string, patch: Partial<FlightSegment>) => void
	setEndpoint: (id: string, which: "depart" | "arrive", patch: Partial<Endpoint>) => void
	setTransfer: (id: string, patch: Partial<TransferInfo>) => void
	toggleTransfer: (id: string, on: boolean) => void
	addSegment: () => void
	removeSegment: (id: string) => void
	regenerateIds: () => void
}

export default function FlightForm(props: FlightFormProps) {
	const { t } = useTranslation();
	const {
		data,
		errors,
		update,
		updateSegment,
		setEndpoint,
		setTransfer,
		toggleTransfer,
		addSegment,
		removeSegment,
		regenerateIds,
	} = props;

	const f = (k: string) => t(`flight.field.${k}` as never);
	const err = (path: string) =>
		errors[path] ? t(`validation.${errors[path]}` as never) : undefined;
	const num = (value: string) => {
		const n = Number(value);
		return Number.isFinite(n) ? n : 0;
	};

	return (
		<>
			{/* order */}
			<SectionCard title={t("flight.section.order")}>
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
						<Field label={f("bookingNo")} required error={err("bookingNo")}>
							<TextInput
								value={data.bookingNo}
								readOnly={data.idMode === "auto"}
								invalid={!!err("bookingNo")}
								onChange={e => update({ bookingNo: e.target.value })}
								className={data.idMode === "auto" ? "bg-slate-50 font-mono text-xs dark:bg-slate-800" : ""}
							/>
						</Field>
						<Field label={f("pnr")}>
							<TextInput
								value={data.pnr}
								readOnly={data.idMode === "auto"}
								onChange={e => update({ pnr: e.target.value.toUpperCase() })}
								className={data.idMode === "auto" ? "bg-slate-50 font-mono uppercase dark:bg-slate-800" : "font-mono uppercase"}
							/>
						</Field>
						<Field label={f("ticketNo")}>
							<TextInput value={data.ticketNo} onChange={e => update({ ticketNo: e.target.value })} />
						</Field>
						<Field label={f("tripKind")}>
							<SelectInput
								value={data.tripKind}
								onChange={e => update({ tripKind: e.target.value as FlightData["tripKind"] })}
							>
								<option value="oneway">{f("oneway")}</option>
								<option value="roundtrip">{f("roundtrip")}</option>
							</SelectInput>
						</Field>
						<Field label={f("issuingAirline")}>
							<TextInput value={data.issuingAirline} onChange={e => update({ issuingAirline: e.target.value })} />
						</Field>
						<Field label={f("issuedAgent")}>
							<TextInput value={data.issuedAgent} onChange={e => update({ issuedAgent: e.target.value })} />
						</Field>
						<Field label={f("issueDate")} error={err("issueDate")}>
							<TextInput type="date" value={data.issueDate} invalid={!!err("issueDate")} onChange={e => update({ issueDate: e.target.value })} />
						</Field>
						<Field label={f("issueDateTime")}>
							<TextInput
								type="datetime-local"
								value={data.issueDateTime}
								onChange={e => update({ issueDateTime: e.target.value })}
							/>
						</Field>
					</div>
				</div>
			</SectionCard>

			{/* passenger */}
			<SectionCard title={t("flight.section.passenger")}>
				<div className="grid grid-cols-2 gap-3">
					<Field label={f("givenName")} required error={err("givenName")}>
						<TextInput value={data.givenName} invalid={!!err("givenName")} onChange={e => update({ givenName: e.target.value })} />
					</Field>
					<Field label={f("surname")} required error={err("surname")}>
						<TextInput value={data.surname} invalid={!!err("surname")} onChange={e => update({ surname: e.target.value })} />
					</Field>
					<Field label={f("gender")}>
						<SelectInput value={data.gender} onChange={e => update({ gender: e.target.value as FlightData["gender"] })}>
							<option value="male">{f("male")}</option>
							<option value="female">{f("female")}</option>
						</SelectInput>
					</Field>
					<Field label={f("passengerType")}>
						<SelectInput
							value={data.passengerType}
							onChange={e => update({ passengerType: e.target.value as FlightData["passengerType"] })}
						>
							<option value="adult">{f("adult")}</option>
							<option value="child">{f("child")}</option>
						</SelectInput>
					</Field>
					<Field label={f("nationality")}>
						<TextInput value={data.nationality} onChange={e => update({ nationality: e.target.value })} />
					</Field>
					<Field label={f("nationalityZh")}>
						<TextInput value={data.nationalityZh} onChange={e => update({ nationalityZh: e.target.value })} />
					</Field>
					<Field label={f("dob")} error={err("dob")}>
						<TextInput type="date" value={data.dob} invalid={!!err("dob")} onChange={e => update({ dob: e.target.value })} />
					</Field>
					<Field label={f("passport")}>
						<TextInput value={data.passport} onChange={e => update({ passport: e.target.value })} />
					</Field>
					<Field label={f("passportExpiry")} error={err("passportExpiry")} className="col-span-2">
						<TextInput
							type="date"
							value={data.passportExpiry}
							invalid={!!err("passportExpiry")}
							onChange={e => update({ passportExpiry: e.target.value })}
						/>
					</Field>
				</div>
			</SectionCard>

			{/* contact */}
			<SectionCard title={t("flight.section.contact")}>
				<div className="grid grid-cols-2 gap-3">
					<Field label={f("phone")} error={err("phone")}>
						<TextInput value={data.phone} inputMode="tel" invalid={!!err("phone")} onChange={e => update({ phone: e.target.value })} />
					</Field>
					<Field label={f("email")} error={err("email")}>
						<TextInput value={data.email} inputMode="email" invalid={!!err("email")} onChange={e => update({ email: e.target.value })} />
					</Field>
				</div>
			</SectionCard>

			{/* segments */}
			<SectionCard
				title={t("flight.section.segments")}
				right={(
					<button
						type="button"
						onClick={addSegment}
						className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-700"
					>
						+
						{" "}
						{t("flight.segment.add")}
					</button>
				)}
			>
				{err("segments") && (
					<div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 dark:bg-red-950/40">
						{err("segments")}
					</div>
				)}
				<div className="space-y-4">
					{data.segments.map((seg, i) => (
						<SegmentEditor
							key={seg.id}
							seg={seg}
							index={i}
							err={err}
							fieldLabel={f}
							canRemove={data.segments.length > 1}
							onPatch={patch => updateSegment(seg.id, patch)}
							onEndpoint={(which, patch) => setEndpoint(seg.id, which, patch)}
							onTransfer={patch => setTransfer(seg.id, patch)}
							onToggleTransfer={on => toggleTransfer(seg.id, on)}
							onRemove={() => removeSegment(seg.id)}
						/>
					))}
				</div>
			</SectionCard>

			{/* price */}
			<SectionCard title={t("flight.section.price")}>
				<div className="grid grid-cols-2 gap-3">
					<Field label={f("currency")} error={err("currency")}>
						<TextInput
							value={data.currency}
							maxLength={3}
							invalid={!!err("currency")}
							className="uppercase"
							onChange={e => update({ currency: e.target.value.toUpperCase() })}
						/>
					</Field>
					<Field label={f("totalAmount")}>
						<TextInput type="number" min={0} step="0.01" value={data.totalAmount} onChange={e => update({ totalAmount: num(e.target.value) })} />
					</Field>
					<Field label={f("adultPrice")}>
						<TextInput type="number" min={0} step="0.01" value={data.adultPrice} onChange={e => update({ adultPrice: num(e.target.value) })} />
					</Field>
					<Field label={f("fare")}>
						<TextInput type="number" min={0} step="0.01" value={data.fare} onChange={e => update({ fare: num(e.target.value) })} />
					</Field>
					<Field label={f("taxes")}>
						<TextInput type="number" min={0} step="0.01" value={data.taxes} onChange={e => update({ taxes: num(e.target.value) })} />
					</Field>
					<Field label={f("promo")}>
						<TextInput type="number" min={0} step="0.01" value={data.promo} onChange={e => update({ promo: num(e.target.value) })} />
					</Field>
					<Field label={f("guarantee")}>
						<TextInput type="number" min={0} step="0.01" value={data.guarantee} onChange={e => update({ guarantee: num(e.target.value) })} />
					</Field>
					<Field label={f("tripFlex")}>
						<TextInput type="number" min={0} step="0.01" value={data.tripFlex} onChange={e => update({ tripFlex: num(e.target.value) })} />
					</Field>
				</div>
			</SectionCard>

			{/* notes */}
			<SectionCard title={t("flight.section.notes")}>
				<TextAreaInput
					value={data.notes}
					rows={5}
					placeholder={"1. …\n2. …"}
					onChange={e => update({ notes: e.target.value })}
				/>
			</SectionCard>
		</>
	);
}

function SegmentEditor({
	seg,
	index,
	err,
	fieldLabel,
	canRemove,
	onPatch,
	onEndpoint,
	onTransfer,
	onToggleTransfer,
	onRemove,
}: {
	seg: FlightSegment
	index: number
	err: (path: string) => string | undefined
	fieldLabel: (k: string) => string
	canRemove: boolean
	onPatch: (patch: Partial<FlightSegment>) => void
	onEndpoint: (which: "depart" | "arrive", patch: Partial<Endpoint>) => void
	onTransfer: (patch: Partial<TransferInfo>) => void
	onToggleTransfer: (on: boolean) => void
	onRemove: () => void
}) {
	const { t } = useTranslation();
	const p = `segments.${index}`;

	const endFields = (which: "depart" | "arrive") => {
		const ep = seg[which];
		const prefix = which === "depart" ? "depart" : "arrive";
		return (
			<>
				<Field label={fieldLabel(`${prefix}Code`)} required error={err(`${p}.${which}.code`)}>
					<TextInput
						value={ep.code}
						maxLength={3}
						className="font-mono uppercase"
						invalid={!!err(`${p}.${which}.code`)}
						onChange={e => onEndpoint(which, { code: e.target.value.toUpperCase() })}
					/>
				</Field>
				<Field label={fieldLabel(`${prefix}Terminal`)}>
					<TextInput value={ep.terminal} onChange={e => onEndpoint(which, { terminal: e.target.value })} />
				</Field>
				<Field label={fieldLabel(`${prefix}Date`)} required error={err(`${p}.${which}.date`)}>
					<TextInput
						type="date"
						value={ep.date}
						invalid={!!err(`${p}.${which}.date`)}
						onChange={e => onEndpoint(which, { date: e.target.value })}
					/>
				</Field>
				<Field label={fieldLabel(`${prefix}Time`)} required error={err(`${p}.${which}.time`)}>
					<TextInput
						type="time"
						value={ep.time}
						invalid={!!err(`${p}.${which}.time`)}
						onChange={e => onEndpoint(which, { time: e.target.value })}
					/>
				</Field>
				<Field label={fieldLabel(`${prefix}City`)} className="col-span-1">
					<TextInput value={ep.city} onChange={e => onEndpoint(which, { city: e.target.value })} />
				</Field>
				<Field label={fieldLabel(`${prefix}CityZh`)}>
					<TextInput value={ep.cityZh} onChange={e => onEndpoint(which, { cityZh: e.target.value })} />
				</Field>
				<Field label={fieldLabel(`${prefix}Airport`)} className="col-span-2">
					<TextInput value={ep.airport} onChange={e => onEndpoint(which, { airport: e.target.value })} />
				</Field>
				<Field label={fieldLabel(`${prefix}AirportZh`)} className="col-span-2">
					<TextInput value={ep.airportZh} onChange={e => onEndpoint(which, { airportZh: e.target.value })} />
				</Field>
			</>
		);
	};

	return (
		<div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-700 dark:bg-slate-800/40">
			<div className="mb-3 flex items-center justify-between">
				<span className="text-sm font-bold text-slate-700 dark:text-slate-200">
					{t("flight.segment.segment", { n: index + 1 })}
				</span>
				{canRemove && (
					<button
						type="button"
						onClick={onRemove}
						className="rounded-md px-2 py-1 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
					>
						{t("flight.segment.remove")}
					</button>
				)}
			</div>

			<div className="space-y-3">
				<div className="grid grid-cols-2 gap-3">
					<Field label={fieldLabel("flightNo")} required error={err(`${p}.flightNo`)}>
						<TextInput
							value={seg.flightNo}
							invalid={!!err(`${p}.flightNo`)}
							onChange={e => onPatch({ flightNo: e.target.value.toUpperCase() })}
						/>
					</Field>
					<Field label={fieldLabel("aircraft")}>
						<TextInput value={seg.aircraft} onChange={e => onPatch({ aircraft: e.target.value })} />
					</Field>
					<Field label={fieldLabel("airline")}>
						<TextInput value={seg.airline} onChange={e => onPatch({ airline: e.target.value })} />
					</Field>
					<Field label={fieldLabel("airlineZh")}>
						<TextInput value={seg.airlineZh} onChange={e => onPatch({ airlineZh: e.target.value })} />
					</Field>
					<Field label={fieldLabel("cabin")}>
						<TextInput value={seg.cabin} onChange={e => onPatch({ cabin: e.target.value })} />
					</Field>
					<Field label={fieldLabel("cabinZh")}>
						<TextInput value={seg.cabinZh} onChange={e => onPatch({ cabinZh: e.target.value })} />
					</Field>
					<Field label={fieldLabel("duration")} className="col-span-2">
						<TextInput
							type="number"
							min={0}
							value={seg.durationMin}
							onChange={e => onPatch({ durationMin: Number(e.target.value) || 0 })}
						/>
					</Field>
				</div>

				<div className="rounded-lg bg-white/70 p-3 dark:bg-slate-900/50">
					<div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
						{fieldLabel("departDate").replace(/\s*\(.*?\)/g, "")}
						{" "}
						· DEP
					</div>
					<div className="grid grid-cols-2 gap-3">{endFields("depart")}</div>
				</div>
				<div className="rounded-lg bg-white/70 p-3 dark:bg-slate-900/50">
					<div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
						{fieldLabel("arriveDate").replace(/\s*\(.*?\)/g, "")}
						{" "}
						· ARR
					</div>
					<div className="grid grid-cols-2 gap-3">{endFields("arrive")}</div>
					{err(`${p}.arrive.date`) && (
						<div className="mt-2 text-xs text-red-500">{err(`${p}.arrive.date`)}</div>
					)}
				</div>

				{/* transfer */}
				<div className="rounded-lg border border-dashed border-slate-300 p-3 dark:border-slate-600">
					<Checkbox
						label={t("flight.segment.enable")}
						checked={seg.transfer !== null}
						onChange={onToggleTransfer}
					/>
					{seg.transfer && (
						<div className="mt-3 grid grid-cols-2 gap-3">
							<Field label={fieldLabel("transferCity")}>
								<TextInput value={seg.transfer.city} onChange={e => onTransfer({ city: e.target.value })} />
							</Field>
							<Field label={fieldLabel("transferCityZh")}>
								<TextInput value={seg.transfer.cityZh} onChange={e => onTransfer({ cityZh: e.target.value })} />
							</Field>
							<Field label={fieldLabel("transferDuration")}>
								<TextInput
									type="number"
									min={0}
									value={seg.transfer.durationMin}
									onChange={e => onTransfer({ durationMin: Number(e.target.value) || 0 })}
								/>
							</Field>
							<div className="col-span-2 flex flex-wrap gap-4">
								<Checkbox
									label={fieldLabel("transferOvernight")}
									checked={seg.transfer.overnight}
									onChange={v => onTransfer({ overnight: v })}
								/>
								<Checkbox
									label={fieldLabel("transferRecheck")}
									checked={seg.transfer.recheckBaggage}
									onChange={v => onTransfer({ recheckBaggage: v })}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
