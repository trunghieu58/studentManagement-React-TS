import { TextField } from '@material-ui/core';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export default function InputField(props: IInputFieldProps) {
  const { name, control, label, ...inputProps } = props;
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  
  return (
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      label={label}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
