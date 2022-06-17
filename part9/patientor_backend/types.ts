export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export enum Gender {
	Male = 'male',
	Femail = 'female',
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