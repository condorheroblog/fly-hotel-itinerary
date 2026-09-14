import type { ComponentType } from "react";
import type { DocLang, FlightData, FlightTemplateId } from "../types";
import AirlineTemplate from "./AirlineTemplate";
import QunarTemplate from "./QunarTemplate";
import TripComTemplate from "./TripComTemplate";

export interface DocTemplate<I, D> {
	id: I
	nameKey: string
	descKey: string
	Component: ComponentType<{ data: D, lang: DocLang }>
}

export const FLIGHT_TEMPLATES: DocTemplate<FlightTemplateId, FlightData>[] = [
	{
		id: "tripcom",
		nameKey: "flight.templateName.tripcom",
		descKey: "flight.templateDesc.tripcom",
		Component: TripComTemplate,
	},
	{
		id: "qunar",
		nameKey: "flight.templateName.qunar",
		descKey: "flight.templateDesc.qunar",
		Component: QunarTemplate,
	},
	{
		id: "airline",
		nameKey: "flight.templateName.airline",
		descKey: "flight.templateDesc.airline",
		Component: AirlineTemplate,
	},
];

export function getFlightTemplate(id: string): DocTemplate<FlightTemplateId, FlightData> {
	return FLIGHT_TEMPLATES.find(t => t.id === id) ?? FLIGHT_TEMPLATES[0]!;
}
