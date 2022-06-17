import express from 'express';
import patientService from '../services/patientService';
import { PatientRequestBody, PatientWithoutSsn } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
	const patients: Array<PatientWithoutSsn> = patientService.getPatients().map(({
		id, name, dateOfBirth, gender, occupation
	}) => ({
		id, name, dateOfBirth, gender, occupation
	}));
	return res.send(patients);
});

router.post('/', (req, res) => {
	const newPatient = patientService.toNewPatient(req.body as PatientRequestBody);
	const patient = patientService.addPatient(newPatient);
	return res.json(patient);
});

export default router;