import React, { useState } from "react";
import { FieldProps } from "formik";
import {
  TextField,
} from "@material-ui/core";

interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

const FormikNumberField = ({ field, label, min, max }: NumberProps) => {
  const [value, setValue] = useState<number>(0);

  return (
    <div style={{ marginBottom: "1em" }}>
      <TextField
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
		onChange={(e) => {
			const value = parseInt(e.target.value);
			if (value === undefined)
				return;
			if (value > max)
				setValue(max);
			else if (value <= min)
				setValue(min);
			else
				setValue(Math.floor(value));
			console.log('value', value);
      }}
      />
      {/* This crashes the app
	  <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography> */}
    </div>
  );
};

export default FormikNumberField;