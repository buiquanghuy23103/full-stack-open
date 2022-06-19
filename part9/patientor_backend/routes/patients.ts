import express from 'express';
import patientService from '../services/patientService';
import { NewEntryRequestBody, PatientRequestBody, PatientWithoutSsn } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
	try {
		const patients: Array<PatientWithoutSsn> = patientService.getPatients().map(({
			id, name, dateOfBirth, gender, occupation, entries
		}) => ({
			id, name, dateOfBirth, gender, occupation, entries
		}));
		return res.send(patients);
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
});

router.get('/:id', (req, res) => {
	try {
		const requestId = req.params.id;
		const foundPatient = patientService.getPatientById(requestId);
		if (!foundPatient)
			return res.status(404).end();
		else
			return res.status(200).json(foundPatient);
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
});

router.post('/', (req, res) => {
	try {
		const newPatient = patientService.toNewPatient(req.body as PatientRequestBody);
		const patient = patientService.addPatient(newPatient);
		return res.json(patient);
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
});

router.post('/:id/entries', (req, res) => {
	try {
		const requestId = req.params.id;
		const newEntry = patientService.toNewEntry(req.body as NewEntryRequestBody);
		const entry = patientService.addEntry(requestId, newEntry);
		if (!entry)
			return res.status(404).end();
		else
			return res.status(200).json(entry);
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
});

export default router;