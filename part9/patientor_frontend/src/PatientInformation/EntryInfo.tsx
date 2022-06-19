import { assertNever, Entry } from "../types";
import DiagnosisInfo from "./DiagnosisInfo";

interface Props {
	entry: Entry
}

const EntryInfo = ({ entry }: Props) => {
	const diagnoses = entry.diagnosisCodes
		? entry.diagnosisCodes.map(code =>
			<DiagnosisInfo key={code} diagnosisCode={code} />)
		: null;
	switch (entry.type) {
		case 'OccupationalHealthcare':
			return (
				<>
					<p>Specialist: { entry.specialist }</p>
					<p>{entry.date} {entry.description}</p>
					<p>Sick Leave: {entry.sickLeave
						? `start date: ${entry.sickLeave.startDate}
						end date: ${entry.sickLeave.endDate}`
						: 'no'}</p>
					{diagnoses}
				</>
			);
		case 'HealthCheck':
			return (
				<>
					<p>Specialist: {entry.specialist}</p>
					<p>{entry.date} {entry.description}</p>
					<p>Health Check rating: {entry.healthCheckRating}</p>
					{diagnoses}
				</>
			);
		case 'Hospital':
			return (
				<>
					<p>Specialist: {entry.specialist}</p>
					<p>{entry.date} {entry.description}</p>
					<p>Discharge: {entry.discharge
						? `${entry.discharge.date} ${entry.discharge.criteria}`
						: 'not yet'}</p>
					{diagnoses}
				</>
			);
		default:
			assertNever(entry);
			return null;
	}
};

export default EntryInfo;