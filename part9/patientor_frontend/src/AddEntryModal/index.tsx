import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: EntryFormValues) => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => {
	return (
		<Dialog open={modalOpen} onClose={onClose}>
			<DialogTitle>Add Entry</DialogTitle>
			<DialogContent>
				<AddEntryForm
					onSubmit={onSubmit}
					onCancel={onClose} />
			</DialogContent>
		</Dialog>
	);
};

export default AddEntryModal;