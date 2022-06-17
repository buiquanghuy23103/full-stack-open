export const isString = (obj: unknown): obj is string => {
	return typeof obj === 'string'
		|| obj instanceof String;
};

export const isDate = (date: string) => {
	return Boolean(Date.parse(date));
};