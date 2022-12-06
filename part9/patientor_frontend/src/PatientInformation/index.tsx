import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddEntryModal from "../AddEntryModal";
import { HealthCheckEntryFormValues } from "../AddEntryModal/AddHealthCheckEntryForm";
import GenderIcon from "../components/GenderIcon";
import { apiBaseUrl } from "../constants";
import { addEntry, useStateValue } from "../state";
import { Entry, Patient } from "../types";
import EntryInfo from "./EntryInfo";

const PatientInformation = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const { id } = useParams<{ id: string }>();
	const [{ patients }, dispatch] = useStateValue();

	const foundPatient = Object.values(patients).find((patient: Patient) => {
		return patient.id === id;
	});
	if (!id || !foundPatient)
		return <h1>Patient not found.</h1>;
	const { name, gender, ssn, occupation, entries } = foundPatient;

	const openModal = (): void => setModalOpen(true);
	const closeModal = (): void => setModalOpen(false);

	const submitNewEntry = async (entryFormValues: HealthCheckEntryFormValues) => {
		console.log('entryFormValues', entryFormValues);
		try {
			const { data: newEntry } = await axios.post<Entry>(
				`${apiBaseUrl}/patients/${id}/entries`,
				entryFormValues
			);
			dispatch(addEntry(id, newEntry));
			closeModal();
		} catch (error) {
			console.error(error);
		}
	};

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
			<AddEntryModal
				modalOpen={modalOpen}
				onClose={closeModal}
				onSubmit={submitNewEntry}
			/>
			<h3>Entries</h3>
			{(entries && entries.length !== 0)
				? entries.map(entry => (<EntryInfo key={entry.id} entry={entry} />))
				: <p>No entries</p>
			}
		</>
	);
};

export default PatientInformation;