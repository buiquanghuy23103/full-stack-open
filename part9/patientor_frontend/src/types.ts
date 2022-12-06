export const assertNever = (obj: never): never => {
	throw new Error(`Unhandled member of union: ${JSON.stringify(obj)}`);
};

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
	dateOfBirth?: string;
	entries?: Entry[]
}

export type EntryType = 'OccupationalHealthcare' | 'Hospital' | 'HealthCheck';

interface BaseEntry {
	id: string;
	date: string;
	type: EntryType;
	description: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>
}
export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare',
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	}
}
export interface HospitalEntry extends BaseEntry {
	type: 'Hospital',
	discharge?: {
		date: string;
		criteria: string;
	}
}
export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck',
	healthCheckRating: string;
}
export type Entry =
	OccupationalHealthcareEntry
	| HospitalEntry
	| HealthCheckEntry;

export type UnionOmit<T, K extends string | symbol | number>
	= T extends unknown ? Omit<T, K> : never;

