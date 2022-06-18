export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
	
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