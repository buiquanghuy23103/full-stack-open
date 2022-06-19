import { Box } from "@material-ui/core";
import { HospitalEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
	entry: HospitalEntry
}
const HospitalEntryInfo = ({entry}: Props) => {
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
			<p>Discharge: {entry.discharge
				? `${entry.discharge.date} ${entry.discharge.criteria}`
				: 'not yet'}</p>
			<DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
		</Box>
	);
};

export default HospitalEntryInfo;