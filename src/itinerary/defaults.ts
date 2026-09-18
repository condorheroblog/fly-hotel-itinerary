import type { FlightData, FlightSegment, HotelData } from "./types";
import { uid } from "../lib/utils";

const BASE = import.meta.env.BASE_URL;

function seg(partial: Omit<FlightSegment, "id">): FlightSegment {
	return { id: uid("seg"), ...partial };
}

/*
 * All sample data below is fictional and generated for demonstration only.
 * Names, document numbers, order numbers, addresses, phone numbers, dates
 * and amounts do not belong to any real person or booking.
 */

/* ------------------------------ flight samples ----------------------------- */

const flightTripCom: FlightData = {
	idMode: "auto",
	bookingNo: "1699887766554433",
	pnr: "X7K2M9",
	ticketNo: "",
	issuingAirline: "Trip.com",
	issuedAgent: "",
	issueDate: "2027-03-08",
	issueDateTime: "2027-03-08T10:30",
	tripKind: "roundtrip",

	givenName: "GOUSHENG",
	surname: "ZHANG",
	gender: "male",
	passengerType: "adult",
	nationality: "China",
	nationalityZh: "中国",
	dob: "1990-05-12",
	passport: "EA8765432",
	passportExpiry: "2032-08-20",

	phone: "+86 138 0013 8000",
	email: "gousheng.zhang@example.com",

	currency: "CNY",
	totalAmount: 4580,
	adultPrice: 3280,
	fare: 2680,
	taxes: 720,
	promo: 0,
	guarantee: 0,
	tripFlex: 580,

	notes: "",
	segments: [
		seg({
			airline: "China Eastern Airlines",
			airlineZh: "中国东方航空",
			flightNo: "MU5023",
			aircraft: "Airbus A320-212 (Mid-sized)",
			cabin: "Economy class",
			cabinZh: "经济舱",
			depart: {
				code: "PVG",
				city: "Shanghai",
				cityZh: "上海",
				airport: "Shanghai Pudong Intl.",
				airportZh: "上海浦东国际机场",
				terminal: "T1",
				date: "2027-04-12",
				time: "08:30",
			},
			arrive: {
				code: "CEB",
				city: "Cebu",
				cityZh: "宿务",
				airport: "Mactan-Cebu Intl.",
				airportZh: "麦克坦-宿务国际机场",
				terminal: "T2",
				date: "2027-04-12",
				time: "13:10",
			},
			durationMin: 280,
			transfer: null,
		}),
		seg({
			airline: "Cebu Pacific",
			airlineZh: "宿务太平洋航空",
			flightNo: "5J572",
			aircraft: "Airbus A330-900 (Large)",
			cabin: "Economy class",
			cabinZh: "经济舱",
			depart: {
				code: "CEB",
				city: "Cebu",
				cityZh: "宿务",
				airport: "Mactan-Cebu Intl.",
				airportZh: "麦克坦-宿务国际机场",
				terminal: "T1",
				date: "2027-04-18",
				time: "18:40",
			},
			arrive: {
				code: "PVG",
				city: "Shanghai",
				cityZh: "上海",
				airport: "Shanghai Pudong Intl.",
				airportZh: "上海浦东国际机场",
				terminal: "T1",
				date: "2027-04-19",
				time: "04:45",
			},
			durationMin: 605,
			transfer: null,
		}),
	],
};

const flightQunar: FlightData = {
	...flightTripCom,
	bookingNo: "338899776655",
	ticketNo: "",
	issuingAirline: "Qunar.com",
	issueDate: "2027-05-06",
	issueDateTime: "2027-05-06T09:00",
	tripKind: "oneway",
	currency: "CNY",
	totalAmount: 0,
	adultPrice: 0,
	fare: 0,
	taxes: 0,
	promo: 0,
	guarantee: 0,
	tripFlex: 0,
	notes:
		"We recommend arriving at the airport at least 3 hours in advance for check-in. When checking in for your flight, you will be required to present a valid identification document used during the ticket purchase process.\n"
		+ "Upon passing through the security checkpoint, you must present both a valid travel document and boarding pass.",
	segments: [
		seg({
			airline: "China Eastern Airlines",
			airlineZh: "中国东方航空",
			flightNo: "MU5023",
			aircraft: "",
			cabin: "Economy",
			cabinZh: "经济舱",
			depart: {
				code: "PVG",
				city: "Shanghai",
				cityZh: "上海",
				airport: "Pudong International Airport",
				airportZh: "浦东国际机场",
				terminal: "T1",
				date: "2027-05-10",
				time: "09:15",
			},
			arrive: {
				code: "CEB",
				city: "Cebu",
				cityZh: "宿务",
				airport: "Mactan-Cebu International Airport",
				airportZh: "麦克坦-宿务国际机场",
				terminal: "T2",
				date: "2027-05-10",
				time: "13:55",
			},
			durationMin: 280,
			transfer: null,
		}),
	],
};

const flightAirline: FlightData = {
	...flightTripCom,
	bookingNo: "30998877665",
	pnr: "Q2W8E4",
	ticketNo: "989-2468135790",
	issuingAirline: "Spring Airlines",
	issuedAgent: "",
	issueDate: "2027-06-02",
	issueDateTime: "2027-06-02T10:00",
	tripKind: "oneway",
	currency: "CNY",
	totalAmount: 1200,
	adultPrice: 0,
	fare: 880,
	taxes: 320,
	promo: 0,
	guarantee: 0,
	tripFlex: 0,
	notes: "",
	segments: [
		seg({
			airline: "Spring Airlines",
			airlineZh: "春秋航空",
			flightNo: "9C8550",
			aircraft: "",
			cabin: "Economy",
			cabinZh: "经济舱",
			depart: {
				code: "SIN",
				city: "Singapore",
				cityZh: "新加坡",
				airport: "Changi Airport",
				airportZh: "樟宜机场",
				terminal: "Terminal 4",
				date: "2027-06-10",
				time: "23:15",
			},
			arrive: {
				code: "PVG",
				city: "Shanghai",
				cityZh: "上海",
				airport: "Pudong International Airport",
				airportZh: "浦东国际机场",
				terminal: "Terminal 2",
				date: "2027-06-11",
				time: "04:45",
			},
			durationMin: 330,
			transfer: null,
		}),
	],
};

export const FLIGHT_SAMPLES: Record<string, FlightData> = {
	tripcom: flightTripCom,
	qunar: flightQunar,
	airline: flightAirline,
};

/** Deep clone so editing never mutates the built-in samples. */
export function cloneFlightSample(id: keyof typeof FLIGHT_SAMPLES): FlightData {
	return structuredClone(FLIGHT_SAMPLES[id]);
}

/* ------------------------------- hotel samples ----------------------------- */

const hotelCard: HotelData = {
	idMode: "auto",
	confirmationNo: "1128776655443322",
	bookingNo: "1128998877665544",
	brand: "携程旅行",

	name: "Sakura Court Hotel Kitahama",
	address:
		"1-2-3 Kitahama, Chuo Ward, Osaka City, Osaka Prefecture, 541-0042, Japan",
	phone: "+81-6-62010000",
	photo: `${BASE}hotel-osaka.jpg`,

	checkIn: "2027-04-01",
	checkOut: "2027-04-05",
	checkInTime: "After 3:00 PM",
	checkOutTime: "Before 11:00 AM",
	rooms: 1,
	nights: 4,

	roomType: "Comfort Double Room-Non-Smoking",
	guests: "ZHANG/GOUSHENG,WANG/CUIHUA",
	occupancy:
		"This room type can accommodate up to 2 guests with a max. of 2 adults",
	occupancyZh: "该房型最多可入住 2 位客人，成人最多 2 位",
	bedInfo: "1 queen bed",
	bedInfoZh: "1 张特大床",
	meals: "No meals included",
	mealsZh: "不含餐",

	prepay: 1888,
	prepayIncludes: "VAT CNY 171.64",
	paid: true,
	atHotel: "JPY 1,000(≈CNY 48.00)",
	atHotelIncludes: "Accommodation Tax JPY 1,000",

	amenities:
		"Toothbrushes · Toothpaste · Shampoo · Conditioner · Soap · Comb · Bathtub · Private bathroom · Private toilet · Hair dryer · Towels · Slippers",

	cancelFreeBefore: "Before 11:59 PM, Mar 29, 2027",
	cancelPenaltyAfter: "After 11:59 PM, Mar 29, 2027",
	penaltyFee: "CNY 1,888.00",
	noShow:
		"If you don't show up for your stay, a fee of CNY 1,888.00 will be charged.",

	contacts:
		"Mainland China: 95010 (Free long-distance calls)\nHong Kong (China): (852) 30083295\nMacau (China), Taiwan (China), and international: (8621) 34064888",
};

const hotelBanner: HotelData = {
	...hotelCard,
	confirmationNo: "7264KX205813",
	bookingNo: "1128334455667788",

	name: "Mactan Seaside Serviced Studios",
	address:
		"88 Seaside Boulevard, Cebu City, Central Visayas, 6000, Philippines",
	phone: "0063-32-2600000",
	photo: `${BASE}hotel-cebu.jpg`,

	checkIn: "2027-04-18",
	checkOut: "2027-04-20",
	checkInTime: "After 2:00 PM",
	checkOutTime: "Before 12:00 PM",
	rooms: 1,
	nights: 2,

	roomType: "Executive Twin Studio",
	guests: "ZHANG/GOUSHENG",
	bedInfo: "2 single beds",
	bedInfoZh: "2 张单人床",

	prepay: 666,
	prepayIncludes: "City tax CNY 5.00\nService charge CNY 50.00\nVAT CNY 61.00",
	atHotel: "",
	atHotelIncludes: "",

	amenities:
		"Toothbrushes · Toothpaste · Shampoo · Conditioner · Soap · Shower cap · Private bathroom · Private toilet · Hair dryer · Shower · Towels · Hot water (24 hours) · Slippers",

	cancelFreeBefore: "Before 3:00 PM, Apr 17, 2027",
	cancelPenaltyAfter: "After 3:00 PM, Apr 17, 2027",
	penaltyFee: "CNY 333.00",
	noShow:
		"If you don't show up for your stay, a fee of CNY 333.00 will be charged.",
};

export const HOTEL_SAMPLES: Record<string, HotelData> = {
	card: hotelCard,
	banner: hotelBanner,
};

export function cloneHotelSample(id: keyof typeof HOTEL_SAMPLES): HotelData {
	return structuredClone(HOTEL_SAMPLES[id]);
}
