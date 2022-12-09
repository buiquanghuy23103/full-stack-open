import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import FormikTextField from "../components/FormikTextField";
import { OccupationalHealthcareEntry, UnionOmit } from "../types";
import * as Yup from "yup";
import FormikTextAreaField from "../components/FormikTextAreaField";
import FormikDiagnosisSelectField from "../components/DiagnosisSelectField";
import { useStateValue } from "../state";
import { todayString } from "../utils";

export type OccupationalHealthcareEntryFormValues = UnionOmit<OccupationalHealthcareEntry, "id">;

interface Props {
	onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
}

const initialValues: OccupationalHealthcareEntryFormValues = {
	date: todayString(),
	type: "OccupationalHealthcare",
	description: "",
	specialist: "",
	diagnosisCodes: [],
	employerName: "",
	sickLeave: {
		startDate: todayString(),
		endDate: todayString()
	}
};

const validator = Yup.object({
	date: Yup.date().required(),
	description: Yup.string().max(500).required(),
	specialist: Yup.string().required(),
	diagnosisCodes: Yup.array().min(1),
	employerName: Yup.string().max(50).required(),
	sickLeave: Yup.object({
		startDate: Yup.date(),
		endDate: Yup.date()
	})
});

const AddOccupationalHealthcareEntryForm = ({ onSubmit }: Props) => {
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
						label="Employer name"
						placeholder="Specialist name"
						name="employerName"
						component={FormikTextField}
					/>
					<Field
						label="Sick leave start date"
						placeholder="YYYY-MM-DD"
						name="sickLeave.startDate"
						component={FormikTextField}
					/>
					<Field
						label="Sick leave end date"
						placeholder="YYYY-MM-DD"
						name="sickLeave.endDate"
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

export default AddOccupationalHealthcareEntryForm;