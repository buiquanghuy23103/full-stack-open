import { useParams } from "react-router-dom";

const PatientInformation = () => {
	const { id } = useParams<{ id: string }>();
	return <h1>Patient Information {id}</h1>;
};

export default PatientInformation;