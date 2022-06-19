import { Diagnosis } from "../types";
import DiagnosisInfo from "./DiagnosisInfo";

interface Props {
	diagnosisCodes?: Array<Diagnosis['code']>
}
const DiagnosisList = ({ diagnosisCodes }: Props) => {
	if (!diagnosisCodes) return null;
	return (<ul>
		{diagnosisCodes.map(code =>
			<DiagnosisInfo key={code} diagnosisCode={code} />)}
	</ul>);
};

export default DiagnosisList;