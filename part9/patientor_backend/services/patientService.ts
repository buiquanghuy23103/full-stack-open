import patientData from '../data/patients.json';
import { NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

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

export default {
	getPatients,
	addPatient
};