import patientData from '../data/patients.json';
import { NewPatient, Patient, PatientRequestBody } from '../types';
import { v1 as uuid } from 'uuid';
import { parseDate, parseGender, parseString } from '../parsers';

const getPatients = () => {
	return patientData as Array<Patient>;
};

const addPatient = (newPatient: NewPatient): Patient => {
	const patient = {
		...newPatient,
		id: uuid()
	};
	patientData.push(patient);
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


export default {
	getPatients,
	addPatient,
	toNewPatient,
	getPatientById
};