import { FormControl, FormHelperText, InputLabel, Select } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { selectCityList } from 'features/Ctity/citySlice';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface ISelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
}

export default function SelectField(props: ISelectFieldProps) {
  const cityList = useAppSelector(selectCityList);
  const { name, control, label } = props;
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl variant="outlined" error={invalid} fullWidth>
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select
        native
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        inputProps={{
          name: 'city',
          id: 'outlined-age-native-simple',
        }}
      >
        <option aria-label="None" value="" />
        {cityList.map((city) => (
          <option key={city.code} value={city.code}>
            {city.name}
          </option>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
