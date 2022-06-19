import { OccupationalHealthcareEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
	entry: OccupationalHealthcareEntry
}
const OccupationalHealthcareEntryInfo = ({ entry }: Props) => {
	return (
		<>
			<p>Specialist: {entry.specialist}</p>
			<p>{entry.date} {entry.description}</p>
			<p>Sick Leave: {entry.sickLeave
				? `start date: ${entry.sickLeave.startDate}
						end date: ${entry.sickLeave.endDate}`
				: 'no'}</p>
			<DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
		</>
	);
};

export default OccupationalHealthcareEntryInfo;