import { FormControl, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import { ErrorMessage, FormikProps } from "formik";
import { useState } from "react";
import { Diagnosis } from "../types";

interface Props {
	diagnoses: Diagnosis[];
	setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
	setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
	name: string;
}

const FormikDiagnosisSelectField = ({
	diagnoses,
	setFieldValue,
	setFieldTouched,
	name
}: Props) => {
	const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
	const onChange = (data: string[]) => {
		setDiagnoses([...data]);
		setFieldTouched(name, true);
		setFieldValue(name, [...data]);
	};

	const stateOptions = diagnoses.map((diagnosis) => ({
		key: diagnosis.code,
		text: `${diagnosis.name} (${diagnosis.code})`,
		value: diagnosis.code,
	}));

	return (
		<FormControl style={{ width: 552, marginBottom: '30px' }}>
			<InputLabel>Diagnoses</InputLabel>
			<Select
				multiple value={selectedDiagnoses}
				onChange={(e) => onChange(e.target.value as string[])}
				input={<Input />}
			>
				{stateOptions.map((option) => (
					<MenuItem key={option.key} value={option.value}>
						{option.text}
					</MenuItem>
				))}
			</Select>
			<ErrorMessage name={name} />
		</FormControl>
	);
};

export default FormikDiagnosisSelectField;