import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import FormikTextField from "../components/FormikTextField";
import { HospitalEntry, UnionOmit } from "../types";
import * as Yup from "yup";
import FormikTextAreaField from "../components/FormikTextAreaField";
import FormikDiagnosisSelectField from "../components/DiagnosisSelectField";
import { useStateValue } from "../state";

export type HospitalEntryFormValues = UnionOmit<HospitalEntry, "id">;

interface Props {
	onSubmit: (values: HospitalEntryFormValues) => void;
}

const initialValues: HospitalEntryFormValues = {
	date: "",
	type: "Hospital",
	description: "",
	specialist: "",
	diagnosisCodes: [],
	discharge: {
		date: (new Date()).toISOString().substring(0, 10),
		criteria: "Test criteria"
	}
};

const validator = Yup.object({
	date: Yup.date().required(),
	description: Yup.string().max(500).required(),
	specialist: Yup.string().required(),
	diagnosisCodes: Yup.array().min(1),
	dischargeDate: Yup.date()
});

const AddHospitalEntryForm = ({ onSubmit }: Props) => {
	const [{diagnoses}] = useStateValue();
	return (
		<Formik
			onSubmit={onSubmit}
			initialValues={initialValues}
			validationSchema={validator}
			>
			{({ setFieldValue, setFieldTouched }) => (
				<Form>
					<Field
						label="Date"
						placeholder="2000-12-01"
						name="date"
						component={FormikTextField}
					/>
					<Field
						label="Description"
						placeholder="No more than 500 characters"
						name="description"
						minRows={3}
						component={FormikTextAreaField}
					/>
					<Field
						label="Specialist"
						placeholder="Specialist name"
						name="specialist"
						component={FormikTextField}
					/>
					<Field
						name="discharge.date"
						label="Discharge date"
						type="date"
						component={FormikTextField}
					/>
					<FormikDiagnosisSelectField
						name="diagnosisCodes"
						setFieldTouched={setFieldTouched}
						setFieldValue={setFieldValue}
						diagnoses={diagnoses}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
					>
						Add Entry
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default AddHospitalEntryForm;