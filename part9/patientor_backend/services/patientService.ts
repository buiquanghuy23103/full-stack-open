import patients from '../data/patients';
import { NewPatient, Patient, PatientRequestBody, NewEntryRequestBody, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';
import { parseDate, parseDischarge, parseGender, parseNumber, parseSickLeave, parseString, parseStringArray } from '../parsers';

const getPatients = () => {
	return patients;
};

const addPatient = (newPatient: NewPatient): Patient => {
	const patient = {
		...newPatient,
		id: uuid()
	};
	patients.push(patient);
	return patient;
};

const getPatientById = (id: string): Patient | undefined => {
	return getPatients().find(patient => patient.id === id);
};

const toNewPatient = ({
	name, dateOfBirth, gender, occupation, ssn
}: PatientRequestBody): NewPatient => ({
	name: parseString(name),
	dateOfBirth: parseDate(dateOfBirth),
	gender: parseGender(gender),
	occupation: parseString(occupation),
	ssn: parseString(ssn),
	entries: []
});

const toNewEntry = (req: NewEntryRequestBody): NewEntry => {
	const {
		type, date, diagnosisCodes, description, specialist, employerName,
		sickLeave, discharge, healthCheckRating
	} = req;
	switch (type) {
		case 'OccupationalHealthcare':
			return ({
				type,
				date: parseDate(date),
				diagnosisCodes: diagnosisCodes ? parseStringArray(description) : undefined,
				specialist: parseString(specialist),
				description: parseString(description),
				employerName: parseString(employerName),
				sickLeave: sickLeave ? parseSickLeave(sickLeave): undefined
			});
		case 'Hospital':
			return ({
				type,
				date: parseDate(date),
				diagnosisCodes: diagnosisCodes ? parseStringArray(description) : undefined,
				specialist: parseString(specialist),
				description: parseString(description),
				discharge: parseDischarge(discharge)
			});
		case 'HealthCheck':
			return ({
				type,
				date: parseDate(date),
				diagnosisCodes: diagnosisCodes ? parseStringArray(description) : undefined,
				specialist: parseString(specialist),
				description: parseString(description),
				healthCheckRating: parseNumber(healthCheckRating)
			});
		default:
			throw new Error(`Missing or incorrect properties: ${JSON.stringify(req)}`);
	}
};

export default {
	getPatients,
	addPatient,
	toNewPatient,
	getPatientById,
	toNewEntry
};