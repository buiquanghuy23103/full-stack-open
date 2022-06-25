import { Button, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Entry, UnionOmit } from "../types";

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

const validate = (values: EntryFormValues) => {
	const requiredError = "Field is required";
	const errors: { [field: string]: string } = {};
	if (!values.date)
		errors.date = requiredError;
	console.log('values', values);
	console.log('errors', errors);
	
	return errors;
};

const AddEntryForm = ({ onSubmit }: Props) => {
	return (
		<Formik
			onSubmit={onSubmit}
			initialValues={initialValues}
			validate={validate}>
			{() => (
				<Form>
					<Field
						label="Date"
						placeholder="2000-12-01"
						name="date"
						component={TextField}
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