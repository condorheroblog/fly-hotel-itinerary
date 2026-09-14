import type { DocLang } from "./types";

export interface L10n {
	en: string
	zh: string
}

/** When zh is blank the English value is kept in all modes. */
function hasZh(pair: L10n): boolean {
	return pair.zh.trim().length > 0;
}

const noL10n = (text: string): L10n => ({ en: text, zh: text });

/**
 * Bilingual document label.
 * - en: English only
 * - zh: Chinese only
 * - bi: English primary with Chinese secondary
 */
export function docText(
	pair: L10n,
	lang: DocLang,
): { primary: string, secondary: string | null } {
	if (lang === "en")
		return { primary: pair.en, secondary: null };
	if (lang === "zh")
		return { primary: hasZh(pair) ? pair.zh : pair.en, secondary: null };
	return { primary: pair.en, secondary: hasZh(pair) ? pair.zh : null };
}

/* ----------------------------------------------------------------- */
/* Label dictionary — fixed text printed on the documents             */
/* ----------------------------------------------------------------- */

type LabelEntry = L10n | { en: string[], zh: string[] };

export const L = {
	// common
	bookingNo: { en: "Booking no.", zh: "预订编号" },
	confirmationNo: { en: "Confirmation no.", zh: "确认号" },
	bookingNoShort: { en: "Booking No.:", zh: "预订号：" },
	checkInVoucher: { en: "Check-in voucher", zh: "入住凭证" },
	checkIn: { en: "Check-in", zh: "入住" },
	checkOut: { en: "Check-out", zh: "退房" },
	rooms: { en: "Rooms", zh: "房间" },
	nights: { en: "Nights", zh: "晚" },
	hotelLocalTime: { en: "Hotel's local time", zh: "酒店当地时间" },

	// flight - trip.com
	flightDetails: { en: "Flight Details", zh: "航班详情" },
	allTimesLocal: { en: "All times are in local time", zh: "所有时间均为当地时间" },
	depart: { en: "Depart", zh: "去程" },
	returnLeg: { en: "Return", zh: "返程" },
	transferIn: { en: "Transfer in", zh: "中转" },
	overnightTransfer: { en: "Overnight transfer", zh: "隔夜中转" },
	recheckBaggage: { en: "Collect & re-check baggage", zh: "请提取并重新托运行李" },
	passengerInfo: { en: "Passenger information", zh: "乘客信息" },
	givenNames: { en: "(Given names)", zh: "（名）" },
	surname: { en: "(Surname)", zh: "（姓）" },
	nationality: { en: "Nationality (country/region)", zh: "国籍（国家/地区）" },
	genderLabel: { en: "Gender:", zh: "性别：" },
	dobLabel: { en: "Date of birth:", zh: "出生日期：" },
	contactInfo: { en: "Contact information", zh: "联系信息" },
	phone: { en: "Phone:", zh: "电话：" },
	email: { en: "Email:", zh: "邮箱：" },
	totalAmount: { en: "Total Amount", zh: "总金额" },
	bookingTotal: { en: "Booking total", zh: "订单合计" },
	adults: { en: "Adults", zh: "成人" },
	ticketFare: { en: "Ticket fare", zh: "票价" },
	taxesFees: { en: "Taxes & fees", zh: "税费" },
	promoCode: { en: "Promo code", zh: "优惠码" },
	smoothGuarantee: { en: "Smooth Travel Guarantee", zh: "无忧出行保障" },
	tripFlex: { en: "TripFlex - EasyCancel & Change", zh: "TripFlex 轻松取消与改签" },
	male: { en: "Male", zh: "男" },
	female: { en: "Female", zh: "女" },
	adult: { en: "Adult", zh: "成人" },
	child: { en: "Child", zh: "儿童" },
	economy: { en: "Economy class", zh: "经济舱" },
	paid: { en: "Paid", zh: "已付" },

	// flight - qunar
	tripItinerary: { en: "TRIP ITINERARY", zh: "行程单" },
	welcome1: {
		en: "Welcome to the online booking system of Qunar.com. Your",
		zh: "欢迎使用去哪儿网在线预订系统。您的",
	},
	orderNumber: { en: "order number:", zh: "订单号：" },
	welcome2: {
		en: "has been successfully booked. Below are the details of your reservation.",
		zh: "已成功预订。以下为您的预订详情。",
	},
	oneWayFlight: { en: "One-way flight", zh: "单程航班" },
	passengerInformation: { en: "Passenger information.", zh: "乘客信息。" },
	passengerName: { en: "Passenger Name", zh: "乘客姓名" },
	gender: { en: "Gender", zh: "性别" },
	birthday: { en: "Birthday", zh: "出生日期" },
	passportNumber: { en: "Passport Number", zh: "护照号码" },
	idExpiration: { en: "ID Expiration Date", zh: "证件有效期" },
	flightInformation: { en: "Flight information.", zh: "航班信息。" },
	departureArrival: { en: "Departure/Arrival", zh: "出发/到达" },
	flight: { en: "Flight", zh: "航班" },
	class: { en: "Class", zh: "舱位" },
	departureTime: { en: "Departure time", zh: "出发时间" },
	arrivalTime: { en: "Arrival time", zh: "到达时间" },
	terminal: { en: "Terminal", zh: "航站楼" },
	takeoff: { en: "Takeoff", zh: "出发" },
	arrival: { en: "Arrival", zh: "到达" },
	otherNotes: { en: "Other notes.", zh: "其他说明。" },

	// flight - airline
	itineraryUpper: { en: "ITINERARY", zh: "行程单" },
	bookingDetails: { en: "Booking Details", zh: "预订详情" },
	orderId: { en: "ORDER ID:", zh: "订单编号：" },
	passenger: { en: "PASSENGER:", zh: "乘客：" },
	issueDate: { en: "ISSUE DATE:", zh: "出票日期：" },
	ticketNumber: { en: "TICKET NUMBER:", zh: "客票编号：" },
	gdsPnr: { en: "GDS PNR:", zh: "GDS 编码：" },
	issuingAirline: { en: "ISSUING AIRLINE:", zh: "出票航空公司：" },
	issuedAgent: { en: "ISSUED AGENT:", zh: "出票代理：" },
	date: { en: "DATE", zh: "日期" },
	airlinePnr: { en: "AIRLINE PNR", zh: "航司编码" },
	flightNo: { en: "FLIGHT", zh: "航班" },
	departureTimeTerminal: { en: "DEPARTURE TIME TERMINAL", zh: "出发时间及航站楼" },
	arrivalTimeTerminal: { en: "ARRIVAL TIME TERMINAL", zh: "到达时间及航站楼" },
	classUpper: { en: "CLASS", zh: "舱位" },
	status: { en: "STATUS", zh: "状态" },
	statusOk: { en: "OK", zh: "确认" },
	paymentDetails: { en: "Payment Details", zh: "支付详情" },
	fare: { en: "FARE:", zh: "票价：" },
	tax: { en: "TAX:", zh: "税费：" },
	total: { en: "TOTAL:", zh: "合计：" },
	notice: { en: "Notice", zh: "须知" },
	noticeItems: {
		en: [
			"YOU ARE REQUIRED TO GET TO THE INDICATED AIRPORT NO LATER THAN 2 HOURS BEFORE THE SCHEDULED DEPARTURE TIME FOR CHECK-IN AT THE COUNTER. YOU MUST PRESENT THE SAME VALID ID CARD AS WHICH YOU USED TO PURCHASE THE TICKET",
			"WHEN YOU GO THROUGH SECURITY CHECK, YOU MUST PRESENT YOUR VALID TRAVEL DOCUMENTS AND BOARDING PASS AS WELL AS THE RECEIPT",
			"FAILED TO USE FLIGHT COUPONS IN SEQUENCE WILL RESULT PENALTY AND ADDITIONAL FARE PAYMENT",
			"CARRIAGE AND OTHER SERVICES PROVIDED BY THE CARRIER SUBJECT TO CONDITIONS OF CARRIAGE, WHICH ARE HEREBY INCORPORATED BY REFERENCE. THESE CONDITIONS MAY BE OBTAINED FROM THE ISSUING CARRIER. PASSENGERS ON A JOURNEY INVOLVING AN ULTIMATE DESTINATION OR STOP IN A COUNTRY OTHER THAN THE COUNTRY OF DEPARTURE ARE ADVISED THAT INTERNATIONAL TREATIES KNOWN AS THE MONTREAL CONVENTION, OR ITS PREDECESSOR, THE WARSAW CONVENTION, INCLUDING ITS AMENDMENTS (THE WARSAW CONVENTION SYSTEM), MAY APPLY TO THE ENTIRE JOURNEY, INCLUDING ANY PORTION THEREOF WITHIN A COUNTRY. FURTHER INFORMATION MAY BE OBTAINED FROM THE CARRIER. WITH THIS TICKET YOU WILL RECEIVE A SET OF NOTICES WHICH FORMS PART OF THE TICKET AND CONTAINS THE \"CONDITIONS OF CONTRACT AND OTHER IMPORTANT NOTICES\". PLEASE MAKE SURE THAT YOU HAVE RECEIVED THESE NOTICES, AND IF NOT, CONTACT THE ISSUING AIRLINE OR TRAVEL AGENT TO OBTAIN COPIES PRIOR TO THE COMMENCEMENT OF YOUR TRIP.",
		],
		zh: [
			"请您最迟于航班预计起飞前 2 小时到达指定机场柜台办理乘机手续，并出示购票时所使用的本人有效身份证件。",
			"通过安全检查时，请同时出示有效旅行证件、登机牌及购票凭证。",
			"未按顺序使用乘机联可能产生罚金及额外票价。",
			"承运人提供的运输及其他服务受其运输条件约束，相关运输条件可向出票承运人索取。若您行程的最终目的地或经停点位于出发国以外的国家，《蒙特利尔公约》或其前身《华沙公约》（含其修订，统称华沙公约体系）等国际条约可能适用于您的全部行程，包括其中位于某国境内的航段。更多信息可向承运人咨询。凭本客票您将获得构成客票一部分的“合同条件及其他重要通知”，如未收到，请在行程开始前联系出票航空公司或旅行代理索取。",
		],
	},

	// hotel
	priceDetails: { en: "Price Details", zh: "价格明细" },
	prepayOnline: { en: "Prepay online", zh: "在线预付" },
	includes: { en: "Includes:", zh: "包含：" },
	payAtHotel: { en: "Pay at hotel", zh: "酒店现付" },
	guestNames: { en: "Guest Names", zh: "入住客人" },
	occupancy: { en: "Occupancy (Per Room)", zh: "可住人数（每间）" },
	roomInfo: { en: "Room info", zh: "房间配置" },
	meals: { en: "Meals", zh: "餐饮" },
	roomAmenities: { en: "Room Amenities", zh: "房间设施" },
	cancellationPolicy: { en: "Cancellation Policy", zh: "取消政策" },
	cancellationFee: { en: "Cancellation fee", zh: "取消费用" },
	freeCancellation: { en: "Free cancellation", zh: "免费取消" },
	contactUs: { en: "Contact Us", zh: "联系我们" },
} satisfies Record<string, LabelEntry>;

export { noL10n };
