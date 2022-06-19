import { assertNever, Entry } from "../types";
import DiagnosisInfo from "./DiagnosisInfo";
import HealthCheckEntryInfo from "./HealthCheckEntryInfo";
import OccupationalHealthcareEntryInfo from "./OccupationalHealthCareEntryInfo";

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
			return (<OccupationalHealthcareEntryInfo entry={entry} />);
		case 'HealthCheck':
			return (<HealthCheckEntryInfo entry={entry} />);
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