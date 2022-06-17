import { Gender } from "./types";

export const isString = (obj: unknown): obj is string => {
	return typeof obj === 'string'
		|| obj instanceof String;
};

export const isDate = (date: string) => {
	return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (obj: any): obj is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(obj);
};