export interface Diagnose {
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
	diagnosisCodes?: Array<Diagnose['code']>
}
interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare',
	employerName: string;
	sickLeave: {
		startDate: string;
		endDate: string;
	}
}
interface HospitalEntry extends BaseEntry {
	type: 'Hospital',
	discharge: {
		date: string;
		criteria: string;
	}
}
export type Entry = OccupationalHealthcareEntry | HospitalEntry;

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