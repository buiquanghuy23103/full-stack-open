import { Gender, OccupationalHealthcareEntry } from "./types";

export const isString = (obj: unknown): obj is string => {
	return typeof obj === 'string'
		|| obj instanceof String;
};

export const isNumber = (obj: unknown): obj is number => {
	return typeof obj === 'number'
		|| obj instanceof Number;
};

export const isDate = (date: string) => {
	return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (obj: any): obj is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(obj);
};

export const isSickLeave = (obj: unknown)
	: obj is OccupationalHealthcareEntry['sickLeave'] => {
	return (
		typeof obj === 'object'
		&& obj !== null
		&& 'startDate' in obj
		&& 'endDate' in obj
		&& isString((obj as Record<string, unknown>).startDate)
		&& isString((obj as Record<string, unknown>).endDate)
	);
};