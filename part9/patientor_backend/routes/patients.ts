import express from 'express';
import patientService from '../services/patientService';
import { PatientRequestBody, PatientWithoutSsn } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
	const patients: Array<PatientWithoutSsn> = patientService.getPatients().map(({
		id, name, dateOfBirth, gender, occupation, entries
	}) => ({
		id, name, dateOfBirth, gender, occupation, entries
	}));
	return res.send(patients);
});

router.get('/:id', (req, res) => {
	const requestId = req.params.id;
	const foundPatient = patientService.getPatientById(requestId);
	if (!foundPatient)
		return res.status(404).end();
	else
	{
		foundPatient.entries = [];
		return res.status(200).json(foundPatient);
	}
});

router.post('/', (req, res) => {
	const newPatient = patientService.toNewPatient(req.body as PatientRequestBody);
	const patient = patientService.addPatient(newPatient);
	return res.json(patient);
});

export default router;