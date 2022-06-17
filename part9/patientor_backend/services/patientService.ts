import patientData from '../data/patients.json';
import { Patient } from '../types';

const getPatients = () => {
	return patientData as Array<Patient>;
};

export default {
	getPatients
};