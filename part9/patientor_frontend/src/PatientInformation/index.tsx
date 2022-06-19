import { useParams } from "react-router-dom";
import GenderIcon from "../components/GenderIcon";
import { useStateValue } from "../state";
import { Patient } from "../types";
import EntryInfo from "./EntryInfo";

const PatientInformation = () => {
	const { id } = useParams<{ id: string }>();
	const [{ patients }] = useStateValue();
	const foundPatient = Object.values(patients).find((patient: Patient) => {
		return patient.id === id;
	});
	if (!foundPatient)
		return <h1>Patient not found.</h1>;
	const { name, gender, ssn, occupation, entries } = foundPatient;
	console.log(foundPatient);
	return (
		<>
			<h2>{name}</h2>
			<GenderIcon gender={gender} />
			<p>ssn: {ssn}</p>
			<p>occupation: {occupation}</p>
			<h3>Entries</h3>
			{(entries && entries.length !== 0)
				? entries.map(entry => (<EntryInfo key={entry.id} entry={entry} />))
				: <p>No entries</p>
			}
		</>
	);
};

export default PatientInformation;