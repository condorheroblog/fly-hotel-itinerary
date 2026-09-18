import type {
	DocLang,
	Endpoint,
	FlightData,
	FlightSegment,
	FlightTemplateId,
	TransferInfo,
} from "../itinerary/types";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FlightForm from "../components/generator/FlightForm";
import GeneratorShell from "../components/generator/GeneratorShell";
import { cloneFlightSample } from "../itinerary/defaults";
import { FLIGHT_TEMPLATES, getFlightTemplate } from "../itinerary/flight";
import { generateFlightIds } from "../itinerary/id";
import { validateFlight } from "../itinerary/validate";
import { useLocalStorage } from "../lib/useLocalStorage";
import { uid } from "../lib/utils";

const TEMPLATE_IDS = ["tripcom", "qunar", "airline"] as const;
const DOC_LANGS = ["en", "zh", "bi"] as const;

const EMPTY_ENDPOINT: Endpoint = {
	code: "",
	city: "",
	cityZh: "",
	airport: "",
	airportZh: "",
	terminal: "",
	date: "",
	time: "",
};

function blankSegment(): FlightSegment {
	return {
		id: uid("seg"),
		airline: "",
		airlineZh: "",
		flightNo: "",
		aircraft: "",
		cabin: "",
		cabinZh: "",
		depart: { ...EMPTY_ENDPOINT },
		arrive: { ...EMPTY_ENDPOINT },
		durationMin: 0,
		transfer: null,
	};
}

export default function FlightPage() {
	const { t } = useTranslation();

	const [templateId, setTemplateId] = useQueryState(
		"t",
		parseAsStringLiteral(TEMPLATE_IDS).withDefault("tripcom"),
	);
	const [docLang, setDocLang] = useQueryState(
		"dl",
		parseAsStringLiteral(DOC_LANGS).withDefault("en"),
	);

	const [data, setData] = useLocalStorage<FlightData>(
		`fhi-flight-v3:${templateId}`,
		cloneFlightSample(templateId),
	);

	const update = (patch: Partial<FlightData>) =>
		setData(prev => ({ ...prev, ...patch }));

	const updateSegment = (id: string, patch: Partial<FlightSegment>) =>
		setData(prev => ({
			...prev,
			segments: prev.segments.map(s => (s.id === id ? { ...s, ...patch } : s)),
		}));

	const setEndpoint = (id: string, which: "depart" | "arrive", patch: Partial<Endpoint>) =>
		setData(prev => ({
			...prev,
			segments: prev.segments.map(s =>
				s.id === id ? { ...s, [which]: { ...s[which], ...patch } } : s,
			),
		}));

	const setTransfer = (id: string, patch: Partial<TransferInfo>) =>
		setData(prev => ({
			...prev,
			segments: prev.segments.map((s) => {
				if (s.id !== id || !s.transfer)
					return s;
				return { ...s, transfer: { ...s.transfer, ...patch } };
			}),
		}));

	const toggleTransfer = (id: string, on: boolean) =>
		setData(prev => ({
			...prev,
			segments: prev.segments.map((s) => {
				if (s.id !== id)
					return s;
				return {
					...s,
					transfer: on
						? { city: "", cityZh: "", durationMin: 0, overnight: false, recheckBaggage: false }
						: null,
				};
			}),
		}));

	const addSegment = () =>
		setData(prev => ({ ...prev, segments: [...prev.segments, blankSegment()] }));

	const removeSegment = (id: string) =>
		setData(prev => ({ ...prev, segments: prev.segments.filter(s => s.id !== id) }));

	const regenerateIds = () =>
		setData(prev => ({ ...prev, ...generateFlightIds(templateId) }));

	const errors = useMemo(() => validateFlight(data), [data]);

	const tpl = getFlightTemplate(templateId);
	const Doc = tpl.Component;

	return (
		<GeneratorShell
			title={t("flight.title")}
			subtitle={t("flight.subtitle")}
			templates={FLIGHT_TEMPLATES.map(({ id, nameKey, descKey }) => ({ id, nameKey, descKey }))}
			templateId={templateId}
			onTemplateChange={id => setTemplateId(id as FlightTemplateId)}
			docLang={docLang as DocLang}
			onDocLangChange={setDocLang}
			onSample={() => setData(cloneFlightSample(templateId))}
			fileName={`flight-${templateId}-${data.bookingNo || "draft"}`}
			form={(
				<FlightForm
					data={data}
					errors={errors}
					update={update}
					updateSegment={updateSegment}
					setEndpoint={setEndpoint}
					setTransfer={setTransfer}
					toggleTransfer={toggleTransfer}
					addSegment={addSegment}
					removeSegment={removeSegment}
					regenerateIds={regenerateIds}
				/>
			)}
			doc={<Doc data={data} lang={docLang as DocLang} />}
		/>
	);
}
