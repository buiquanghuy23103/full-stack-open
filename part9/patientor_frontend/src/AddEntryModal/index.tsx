import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from "./AddHealthCheckEntryForm";

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: HealthCheckEntryFormValues) => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => {
	return (
		<Dialog open={modalOpen} onClose={onClose}>
			<DialogTitle>Add Entry</DialogTitle>
			<DialogContent>
				<AddHealthCheckEntryForm
					onSubmit={onSubmit}
					onCancel={onClose} />
			</DialogContent>
		</Dialog>
	);
};

export default AddEntryModal;