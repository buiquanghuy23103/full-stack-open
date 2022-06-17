import { isString } from "./type_guards";

export const parseString = (obj: unknown): string => {
	if (!obj || !isString(obj))
		throw new Error('Incorrect or missing string');
	return obj;
};