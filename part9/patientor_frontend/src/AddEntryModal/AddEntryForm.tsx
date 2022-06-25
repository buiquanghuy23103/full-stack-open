import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import FormikTextField from "../components/FormikTextField";
import { Entry, UnionOmit } from "../types";
import * as Yup from "yup";

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
	date: Yup.date().required()
});

const AddEntryForm = ({ onSubmit }: Props) => {
	return (
		<Formik
			onSubmit={onSubmit}
			initialValues={initialValues}
			validationSchema={validator}
			>
			{() => (
				<Form>
					<Field
						label="Date"
						placeholder="2000-12-01"
						name="date"
						component={FormikTextField}
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