import { assertNever, Entry } from "../types";

interface Props {
	entry: Entry
}

const EntryInfo = ({ entry }: Props) => {
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
				</>
			);
		case 'HealthCheck':
			return (
				<>
					<p>Specialist: {entry.specialist}</p>
					<p>{entry.date} {entry.description}</p>
					<p>Health Check rating: {entry.healthCheckRating}</p>
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
				</>
			);
		default:
			assertNever(entry);
			return null;
	}
};

export default EntryInfo;