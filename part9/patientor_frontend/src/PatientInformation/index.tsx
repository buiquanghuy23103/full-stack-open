import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientInformation = () => {
	const { id } = useParams<{ id: string }>();
	const [{ patients }] = useStateValue();
	const foundPatient = Object.values(patients).find((patient: Patient) => {
		return patient.id === id;
	});
	if (!foundPatient)
		return <h1>Patient not found.</h1>;
	
	return <h1>Patient Information {foundPatient.name}</h1>;
};

export default PatientInformation;