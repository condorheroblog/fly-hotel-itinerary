import type { FlightData, HotelData } from "./types";
import { isValidDate } from "./format";

export type ErrorMap = Record<string, string>;

const emailRe = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
const phoneRe = /^[+()\-\s\d]{6,24}$/;
const iataRe = /^[A-Z]{3}$/i;
const timeRe = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

function setErr(errors: ErrorMap, key: string, message?: string | null) {
	if (message)
		errors[key] = message;
}

function combineDateTime(date: string, time: string): number | null {
	if (!isValidDate(date) || !timeRe.test(time))
		return null;
	const [y, m, d] = date.split("-").map(Number);
	const [hh, mm] = time.split(":").map(Number);
	return new Date(y!, m! - 1, d!, hh, mm).getTime();
}

export function validateFlight(data: FlightData): ErrorMap {
	const errors: ErrorMap = {};

	setErr(errors, "bookingNo", !data.bookingNo.trim() ? "required" : null);
	setErr(errors, "givenName", !data.givenName.trim() ? "required" : null);
	setErr(errors, "surname", !data.surname.trim() ? "required" : null);
	if (data.email && !emailRe.test(data.email))
		errors.email = "email";
	if (data.phone && !phoneRe.test(data.phone))
		errors.phone = "phone";
	if (data.issueDate && !isValidDate(data.issueDate))
		errors.issueDate = "date";
	if (data.dob && !isValidDate(data.dob))
		errors.dob = "date";
	if (data.passportExpiry && !isValidDate(data.passportExpiry))
		errors.passportExpiry = "date";
	if (!/^[A-Z]{3}$/i.test(data.currency))
		errors.currency = "number";

	if (data.segments.length === 0)
		errors.segments = "minSegments";

	data.segments.forEach((seg, i) => {
		const p = `segments.${i}`;
		if (!seg.flightNo.trim())
			errors[`${p}.flightNo`] = "required";
		for (const which of ["depart", "arrive"] as const) {
			const ep = seg[which];
			if (!iataRe.test(ep.code))
				errors[`${p}.${which}.code`] = "iata";
			if (!isValidDate(ep.date))
				errors[`${p}.${which}.date`] = "date";
			if (!timeRe.test(ep.time))
				errors[`${p}.${which}.time`] = "time";
		}
		const dep = combineDateTime(seg.depart.date, seg.depart.time);
		const arr = combineDateTime(seg.arrive.date, seg.arrive.time);
		if (dep !== null && arr !== null && arr < dep)
			errors[`${p}.arrive.date`] = "arrivalAfterDeparture";
	});

	return errors;
}

export function validateHotel(data: HotelData): ErrorMap {
	const errors: ErrorMap = {};
	setErr(errors, "confirmationNo", !data.confirmationNo.trim() ? "required" : null);
	setErr(errors, "bookingNo", !data.bookingNo.trim() ? "required" : null);
	setErr(errors, "name", !data.name.trim() ? "required" : null);

	if (!isValidDate(data.checkIn))
		errors.checkIn = "date";
	if (!isValidDate(data.checkOut))
		errors.checkOut = "date";
	if (isValidDate(data.checkIn) && isValidDate(data.checkOut) && data.checkOut <= data.checkIn)
		errors.checkOut = "checkoutAfterCheckin";
	if (!Number.isFinite(data.rooms) || data.rooms < 1)
		errors.rooms = "number";
	if (!Number.isFinite(data.nights) || data.nights < 1)
		errors.nights = "number";
	if (!Number.isFinite(data.prepay) || data.prepay < 0)
		errors.prepay = "number";
	return errors;
}
