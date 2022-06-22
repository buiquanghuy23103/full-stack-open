import { Dialog, DialogTitle } from "@material-ui/core";

interface Props {
	modalOpen: boolean;
	onClose: () => void;
}

const AddEntryModal = ({ modalOpen, onClose }: Props) => {
	return (
		<Dialog open={modalOpen} onClose={onClose}>
			<DialogTitle>Sample Modal</DialogTitle>
		</Dialog>
	);
};

export default AddEntryModal;