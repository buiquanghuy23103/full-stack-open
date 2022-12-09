import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddEntryModal from "../AddEntryModal";
import { HealthCheckEntryFormValues } from "../AddEntryModal/AddHealthCheckEntryForm";
import { HospitalEntryFormValues } from "../AddEntryModal/AddHospitalEntryForm";
import { OccupationalHealthcareEntryFormValues } from "../AddEntryModal/OccupationalHealthcareEntryForm";
import GenderIcon from "../components/GenderIcon";
import { apiBaseUrl } from "../constants";
import { addEntry, useStateValue } from "../state";
import { Entry, EntryType, Patient } from "../types";
import EntryInfo from "./EntryInfo";

export type GeneralEntryFormValues =
	HealthCheckEntryFormValues
	| HospitalEntryFormValues
	| OccupationalHealthcareEntryFormValues;

const PatientInformation = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [formType, setFormType] = useState<EntryType | null>(null);
	const { id } = useParams<{ id: string }>();
	const [{ patients }, dispatch] = useStateValue();

	const foundPatient = Object.values(patients).find((patient: Patient) => {
		return patient.id === id;
	});
	if (!id || !foundPatient)
		return <h1>Patient not found.</h1>;
	const { name, gender, ssn, occupation, entries } = foundPatient;

	const openModal = (formType: EntryType) => () => {
		setModalOpen(true);
		setFormType(formType);
	};

	const closeModal = (): void => {
		setModalOpen(false);
		setFormType(null);
	};

	const submitEntry = async (entryFormValues: GeneralEntryFormValues) => {
		console.log('entryFormValues', entryFormValues);
		const { data: newEntry } = await axios.post<Entry>(
			`${apiBaseUrl}/patients/${id}/entries`,
			entryFormValues
		);
		dispatch(addEntry(id, newEntry));
		closeModal();
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
				onClick={ openModal('HealthCheck') }>
				Add health check entry
			</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={ openModal('Hospital') }>
				Add hospital entry
			</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={ openModal('OccupationalHealthcare') }>
				Add occupational health care entry
			</Button>
			<AddEntryModal
				modalOpen={modalOpen}
				onClose={closeModal}
				onSubmit={submitEntry}
				type={formType}
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