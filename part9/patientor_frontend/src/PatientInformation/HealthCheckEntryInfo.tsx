import { HealthCheckEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
	entry: HealthCheckEntry
}
const HealthCheckEntryInfo = ({entry}: Props) => {
	return (
		<>
			<p>Specialist: {entry.specialist}</p>
			<p>{entry.date} {entry.description}</p>
			<p>Health Check rating: {entry.healthCheckRating}</p>
			<DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
		</>
	);
};

export default HealthCheckEntryInfo;