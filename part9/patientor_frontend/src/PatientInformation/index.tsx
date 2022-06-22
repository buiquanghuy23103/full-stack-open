import { Button } from "@material-ui/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddEntryModal from "../AddEntryModal";
import GenderIcon from "../components/GenderIcon";
import { useStateValue } from "../state";
import { Patient } from "../types";
import EntryInfo from "./EntryInfo";

const PatientInformation = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const { id } = useParams<{ id: string }>();
	const [{ patients }] = useStateValue();

	const foundPatient = Object.values(patients).find((patient: Patient) => {
		return patient.id === id;
	});
	if (!foundPatient)
		return <h1>Patient not found.</h1>;
	const { name, gender, ssn, occupation, entries } = foundPatient;

	const openModal = (): void => setModalOpen(true);
	const closeModal = (): void => setModalOpen(false);

	return (
		<>
			<h2>{name}</h2>
			<GenderIcon gender={gender} />
			<p>ssn: {ssn}</p>
			<p>occupation: {occupation}</p>
			<Button
				variant="contained"
				color="primary"
				onClick={openModal}>
				Add Entry
			</Button>
			<AddEntryModal modalOpen={modalOpen} onClose={closeModal} />
			<h3>Entries</h3>
			{(entries && entries.length !== 0)
				? entries.map(entry => (<EntryInfo key={entry.id} entry={entry} />))
				: <p>No entries</p>
			}
		</>
	);
};

export default PatientInformation;