import { Gender } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

interface Props {
	gender: Gender
}
const GenderIcon = ({ gender }: Props) => {
	switch (gender) {
		case 'male':
			return <MaleIcon />;
		case 'female':
			return <FemaleIcon />;
		default:
			return <QuestionMarkIcon/>;
	}
};

export default GenderIcon;