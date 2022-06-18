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
	const { name, gender, ssn, occupation } = foundPatient;
	return (
		<>
			<h2>{name} - {gender}</h2>
			<p>ssn: {ssn}</p>
			<p>occupation: {occupation}</p>
		</>
	);
};

export default PatientInformation;