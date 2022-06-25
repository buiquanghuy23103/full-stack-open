import { InputLabel, TextareaAutosize, Typography } from "@material-ui/core";
import { ErrorMessage, FieldProps } from "formik";

interface Props extends FieldProps {
	label: string;
	placeholder: string;
	minRows: number;
}

const FormikTextAreaField = ({
	label, placeholder, minRows, field
}: Props) => (
	<div style={{ marginBottom: "1em" }}>
		<InputLabel>{ label }</InputLabel>
		<TextareaAutosize
			placeholder={placeholder}
			minRows={minRows}
			{...field}
		/>
		<Typography variant="subtitle2" style={{ color: "red" }}>
			<ErrorMessage name={field.name} />
		</Typography>
	</div>
);

export default FormikTextAreaField;