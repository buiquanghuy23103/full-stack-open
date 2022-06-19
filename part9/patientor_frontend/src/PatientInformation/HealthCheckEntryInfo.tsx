import { Box } from "@material-ui/core";
import { HealthCheckEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
	entry: HealthCheckEntry
}
const HealthCheckEntryInfo = ({entry}: Props) => {
	return (
		<Box
			sx={{
				border: '2px solid black',
				borderRadius: '10px',
				padding: '10px',
				marginBottom: '10px'
			}}>
			<p>Specialist: {entry.specialist}</p>
			<p>{entry.date} {entry.description}</p>
			<p>Health Check rating: {entry.healthCheckRating}</p>
			<DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
		</Box>
	);
};

export default HealthCheckEntryInfo;