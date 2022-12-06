import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { GeneralEntryFormValues } from "../PatientInformation";
import { EntryType } from "../types";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: GeneralEntryFormValues) => void;
	type: EntryType | null
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, type }: Props) => {
	if (type == null) return null;

	const formBasedOnEntryType = () => {
		switch (type) {
			case 'HealthCheck':
				return <AddHealthCheckEntryForm
					onSubmit={onSubmit}
				/>;
			case 'Hospital':
				return <AddHospitalEntryForm
					onSubmit={onSubmit}
				/>;
				break;
			default:
				break;
		}
	};

	return (
		<Dialog open={modalOpen} onClose={onClose}>
			<DialogTitle>Add Entry</DialogTitle>
			<DialogContent>
				{ formBasedOnEntryType() }
			</DialogContent>
		</Dialog>
	);
};

export default AddEntryModal;