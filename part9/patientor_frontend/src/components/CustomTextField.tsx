import { TextField, Typography } from "@material-ui/core";
import { ErrorMessage, FieldProps } from "formik";

interface Props extends FieldProps {
	label: string;
	placeholder: string;
}

const FormikTextField = ({ field, label, placeholder }: Props) => (
	<div style={{ marginBottom: "1em" }}>
		<TextField
			fullWidth
			label={label}
			placeholder={placeholder}
			{...field}
		/>
		<Typography variant="subtitle2" style={{ color: "red" }}>
			<ErrorMessage name={field.name} />
		</Typography>
	</div>
);

export default FormikTextField;