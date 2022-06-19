import { Gender, HospitalEntry, OccupationalHealthcareEntry } from "./types";
import { isDate, isGender, isNumber, isSickLeave, isString } from "./type_guards";

export const parseString = (obj: unknown): string => {
	if (!obj || !isString(obj))
		throw new Error('Incorrect or missing string');
	return obj;
};

export const parseNumber = (obj: unknown): number => {
	if (!obj || !isNumber(obj))
		throw new Error('Invalid or missing number');
	return obj;
};

export const parseDate = (obj: unknown): string => {
	if (!obj || !isString(obj) || !isDate(obj))
		throw new Error(`Invalid date format: ${obj}`);
	return obj;
};

export const parseGender = (obj: unknown): Gender => {
	if (!obj || !isString(obj) || !isGender(obj))
		throw new Error('Missing or invalid gender');
	return obj;
};

export const parseStringArray = (obj: unknown): string[] => {
	if (!obj || !Array.isArray(obj))
		throw new Error(`Not a string array: ${JSON.stringify(obj)}`);
	const strArr = [] as string[];
	for (const item of obj) {
		if (!isString(item))
			throw new Error(`Not a string array: ${JSON.stringify(obj)}`);
		strArr.push(item);
	}
	return strArr;
};

export const parseSickLeave = (obj: unknown)
	: OccupationalHealthcareEntry['sickLeave'] => {
	if (!isSickLeave(obj))
		throw new Error(`Not a SickLeave object: ${JSON.stringify(obj)}`);
	return obj;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseDischarge = (obj: any): HospitalEntry['discharge'] => {
	return {
		date: parseDate(obj.date),
		criteria: parseString(obj.criteria)
	};
};