import express from 'express';
import patientService from '../services/patientService';
import { PatientWithoutSsn } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
	const patients: Array<PatientWithoutSsn> = patientService.getPatients().map(({
		id, name, dateOfBirth, gender, occupation
	}) => ({
		id, name, dateOfBirth, gender, occupation
	}));
	return res.send(patients);
});

export default router;