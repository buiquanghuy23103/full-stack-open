import diagnoseData from '../data/diagnoses.json';
import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
	return diagnoseData as Array<Diagnosis>;
};

export default {
	getDiagnoses
};