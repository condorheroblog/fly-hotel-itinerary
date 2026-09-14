export type DocLang = "en" | "zh" | "bi";
export type IdMode = "auto" | "manual";
export type Gender = "male" | "female";
export type PassengerType = "adult" | "child";
export type TripKind = "oneway" | "roundtrip";

export type FlightTemplateId = "tripcom" | "qunar" | "airline";
export type HotelTemplateId = "card" | "banner";

export interface Endpoint {
	/** IATA airport code, e.g. PVG */
	code: string
	city: string
	cityZh: string
	airport: string
	airportZh: string
	terminal: string
	/** YYYY-MM-DD */
	date: string
	/** HH:MM */
	time: string
}

export interface TransferInfo {
	city: string
	cityZh: string
	durationMin: number
	overnight: boolean
	recheckBaggage: boolean
}

export interface FlightSegment {
	id: string
	airline: string
	airlineZh: string
	flightNo: string
	aircraft: string
	cabin: string
	cabinZh: string
	depart: Endpoint
	arrive: Endpoint
	durationMin: number
	/** Transfer/layover after this segment (rendered between segments). */
	transfer: TransferInfo | null
}

export interface FlightData {
	idMode: IdMode
	bookingNo: string
	pnr: string
	ticketNo: string
	issuingAirline: string
	issuedAgent: string
	/** YYYY-MM-DD */
	issueDate: string
	/** YYYY-MM-DDTHH:MM */
	issueDateTime: string
	tripKind: TripKind

	givenName: string
	surname: string
	gender: Gender
	passengerType: PassengerType
	nationality: string
	nationalityZh: string
	/** YYYY-MM-DD */
	dob: string
	passport: string
	/** YYYY-MM-DD */
	passportExpiry: string

	phone: string
	email: string

	currency: string
	totalAmount: number
	adultPrice: number
	fare: number
	taxes: number
	promo: number
	guarantee: number
	tripFlex: number

	notes: string
	segments: FlightSegment[]
}

export interface HotelData {
	idMode: IdMode
	confirmationNo: string
	bookingNo: string
	brand: string

	name: string
	address: string
	phone: string
	photo: string

	checkIn: string
	checkOut: string
	checkInTime: string
	checkOutTime: string
	rooms: number
	nights: number

	roomType: string
	guests: string
	occupancy: string
	occupancyZh: string
	bedInfo: string
	bedInfoZh: string
	meals: string
	mealsZh: string

	prepay: number
	prepayIncludes: string
	paid: boolean
	atHotel: string
	atHotelIncludes: string

	amenities: string

	cancelFreeBefore: string
	cancelPenaltyAfter: string
	penaltyFee: string
	noShow: string

	contacts: string
}
