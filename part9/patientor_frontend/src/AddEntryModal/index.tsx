import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import AddEntryForm from "./AddEntryForm";

interface Props {
	modalOpen: boolean;
	onClose: () => void;
}

const AddEntryModal = ({ modalOpen, onClose }: Props) => {
	return (
		<Dialog open={modalOpen} onClose={onClose}>
			<DialogTitle>Add Entry</DialogTitle>
			<DialogContent>
				<AddEntryForm
					onSubmit={onClose}
					onCancel={onClose} />
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={onClose}>Add Entry</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddEntryModal;