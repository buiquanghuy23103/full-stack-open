import { assertNever, Entry } from "../types";
import HealthCheckEntryInfo from "./HealthCheckEntryInfo";
import HospitalEntryInfo from "./HospitalEntryInfo";
import OccupationalHealthcareEntryInfo from "./OccupationalHealthCareEntryInfo";

interface Props {
	entry: Entry
}

const EntryInfo = ({ entry }: Props) => {
	switch (entry.type) {
		case 'OccupationalHealthcare':
			return (<OccupationalHealthcareEntryInfo entry={entry} />);
		case 'HealthCheck':
			return (<HealthCheckEntryInfo entry={entry} />);
		case 'Hospital':
			return (<HospitalEntryInfo entry={entry} />);
		default:
			assertNever(entry);
			return null;
	}
};

export default EntryInfo;