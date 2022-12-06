export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}
interface BaseEntry {
	id: string;
	date: string;
	type: string;
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
	discharge: {
		date: string;
		criteria: string;
	}
}
interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck',
	healthCheckRating: string;
}
export type Entry =
	OccupationalHealthcareEntry
	| HospitalEntry
	| HealthCheckEntry;

type UnionOmit<T, K extends string | symbol | number> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, 'id'>;

export interface NewEntryRequestBody {
	date: unknown;
	type: unknown;
	description: unknown;
	specialist: unknown;
	diagnosisCodes?: unknown;
	employerName?: unknown;
	sickLeave?: unknown;
	discharge?: unknown;
	healthCheckRating?: unknown;
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
	entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'entries' | 'ssn'>;

export enum Gender {
	Male = 'male',
	Female = 'female',
	Unknown = 'unknown'
}

export interface PatientRequestBody {
	name: unknown,
	dateOfBirth: unknown,
	gender: unknown,
	occupation: unknown,
	ssn: unknown
}

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;