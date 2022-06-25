import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { Field, FieldProps } from "formik";
import { Gender } from "../types";

export type GenderOption = {
	value: Gender;
	label: string;
};

type SelectFieldProps = {
	name: string;
	label: string;
	options: GenderOption[];
};

const CustomSelect = ({
	field, ...props
}: FieldProps) => <Select {...field} {...props} />;

const FormikSelectField = ({ name, label, options }: SelectFieldProps) => (
	<>
		<InputLabel>{label}</InputLabel>
		<Field
			fullWidth
			style={{ marginBottom: "0.5em" }}
			label={label}
			component={CustomSelect}
			name={name}
		>
			{options.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label || option.value}
				</MenuItem>
			))}
		</Field>
	</>
);

export default FormikSelectField;