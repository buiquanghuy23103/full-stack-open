import { useStateValue } from "../state";
interface Props {
	diagnosisCode: string;
}
const DiagnosisInfo = ({ diagnosisCode }: Props) => {
	const [{ diagnoses }] = useStateValue();
	const foundDiagnosis = diagnoses.find(diagnosis =>
		diagnosis.code === diagnosisCode);
	return foundDiagnosis
		? <li>{diagnosisCode} {foundDiagnosis.name} {foundDiagnosis.latin}</li>
		: <li>{diagnosisCode} Not found</li>;
};

export default DiagnosisInfo;