import type { DocLang, HotelData, HotelTemplateId } from "../itinerary/types";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import GeneratorShell from "../components/generator/GeneratorShell";
import HotelForm from "../components/generator/HotelForm";
import { cloneHotelSample } from "../itinerary/defaults";
import { getHotelTemplate, HOTEL_TEMPLATES } from "../itinerary/hotel";
import { generateHotelIds } from "../itinerary/id";
import { validateHotel } from "../itinerary/validate";
import { useLocalStorage } from "../lib/useLocalStorage";

const TEMPLATE_IDS = ["card", "banner"] as const;
const DOC_LANGS = ["en", "zh", "bi"] as const;

export default function HotelPage() {
	const { t } = useTranslation();

	const [templateId, setTemplateId] = useQueryState(
		"t",
		parseAsStringLiteral(TEMPLATE_IDS).withDefault("card"),
	);
	const [docLang, setDocLang] = useQueryState(
		"dl",
		parseAsStringLiteral(DOC_LANGS).withDefault("en"),
	);

	const [data, setData] = useLocalStorage<HotelData>(
		`fhi-hotel-v2:${templateId}`,
		cloneHotelSample(templateId),
	);

	const update = (patch: Partial<HotelData>) =>
		setData(prev => ({ ...prev, ...patch }));

	const regenerateIds = () =>
		setData(prev => ({ ...prev, ...generateHotelIds(templateId) }));

	const errors = useMemo(() => validateHotel(data), [data]);

	const tpl = getHotelTemplate(templateId);
	const Doc = tpl.Component;

	return (
		<GeneratorShell
			title={t("hotel.title")}
			subtitle={t("hotel.subtitle")}
			templates={HOTEL_TEMPLATES.map(({ id, nameKey, descKey }) => ({ id, nameKey, descKey }))}
			templateId={templateId}
			onTemplateChange={id => setTemplateId(id as HotelTemplateId)}
			docLang={docLang as DocLang}
			onDocLangChange={setDocLang}
			onSample={() => setData(cloneHotelSample(templateId))}
			fileName={`hotel-${templateId}-${data.confirmationNo || "draft"}`}
			form={<HotelForm data={data} errors={errors} update={update} regenerateIds={regenerateIds} />}
			doc={<Doc data={data} lang={docLang as DocLang} />}
		/>
	);
}
