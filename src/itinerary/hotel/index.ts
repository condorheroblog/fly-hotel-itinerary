import type { ComponentType } from "react";
import type { DocTemplate } from "../flight";
import type { DocLang, HotelData, HotelTemplateId } from "../types";
import BannerVoucherTemplate from "./BannerVoucherTemplate";
import VoucherCardTemplate from "./VoucherCardTemplate";

type HotelDocTemplate = DocTemplate<HotelTemplateId, HotelData>;
type HotelComponent = ComponentType<{ data: HotelData, lang: DocLang }>;

export const HOTEL_TEMPLATES: HotelDocTemplate[] = [
	{
		id: "card",
		nameKey: "hotel.templateName.card",
		descKey: "hotel.templateDesc.card",
		Component: VoucherCardTemplate as HotelComponent,
	},
	{
		id: "banner",
		nameKey: "hotel.templateName.banner",
		descKey: "hotel.templateDesc.banner",
		Component: BannerVoucherTemplate as HotelComponent,
	},
];

export function getHotelTemplate(id: string): HotelDocTemplate {
	return HOTEL_TEMPLATES.find(t => t.id === id) ?? HOTEL_TEMPLATES[0]!;
}
