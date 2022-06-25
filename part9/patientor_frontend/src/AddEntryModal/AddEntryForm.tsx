import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import FormikTextField from "../components/FormikTextField";
import { Entry, UnionOmit } from "../types";
import * as Yup from "yup";
import FormikTextAreaField from "../components/FormikTextAreaField";
import FormikDiagnosisSelectField from "../components/DiagnosisSelectField";
import { useStateValue } from "../state";
import FormikNumberField from "../components/FormikNumberField";

export type EntryFormValues = UnionOmit<Entry, "id">;

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

const initialValues: EntryFormValues = {
	date: "",
	type: "HealthCheck",
	description: "",
	specialist: "",
	diagnosisCodes: [],
	healthCheckRating: 0
};

const validator = Yup.object({
	date: Yup.date().required(),
	description: Yup.string().max(5).required(),
	specialist: Yup.string().required(),
	diagnosisCodes: Yup.array().min(1)
});

const AddEntryForm = ({ onSubmit }: Props) => {
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
						name="healthCheckRating"
						label="Health check rating"
						min={0}
						max={10}
						component={FormikNumberField}
					/>
					<FormikDiagnosisSelectField
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

export default AddEntryForm;