import { Box } from "@material-ui/core";
import { OccupationalHealthcareEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
	entry: OccupationalHealthcareEntry
}
const OccupationalHealthcareEntryInfo = ({ entry }: Props) => {
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
			<p>Sick Leave: {entry.sickLeave
				? `start date: ${entry.sickLeave.startDate}
						end date: ${entry.sickLeave.endDate}`
				: 'no'}</p>
			<DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
		</Box>
	);
};

export default OccupationalHealthcareEntryInfo;