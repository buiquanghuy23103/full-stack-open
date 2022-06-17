import { isDate, isString } from "./type_guards";

export const parseString = (obj: unknown): string => {
	if (!obj || !isString(obj))
		throw new Error('Incorrect or missing string');
	return obj;
};

export const parseDate = (obj: unknown): string => {
	if (!obj || !isString(obj) || !isDate(obj))
		throw new Error(`Invalid date format: ${obj}`);
	return obj;
};