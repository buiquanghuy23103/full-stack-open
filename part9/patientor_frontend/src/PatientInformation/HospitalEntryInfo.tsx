import { HospitalEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
	entry: HospitalEntry
}
const HospitalEntryInfo = ({entry}: Props) => {
	return (
		<>
			<p>Specialist: {entry.specialist}</p>
			<p>{entry.date} {entry.description}</p>
			<p>Discharge: {entry.discharge
				? `${entry.discharge.date} ${entry.discharge.criteria}`
				: 'not yet'}</p>
			<DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
		</>
	);
};

export default HospitalEntryInfo;