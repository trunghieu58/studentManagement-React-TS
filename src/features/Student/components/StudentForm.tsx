import { Student } from 'models';
import * as React from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import InputField from './FormFields/InputField';
import RadioGroupField from './FormFields/RadioGroupField';
import SelectField from './FormFields/SelectField';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface IStudentFormProps {
  initialValue?: Student;
  onSubmit: (student: Student) => void;
}

const options = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

const schema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  age: yup
    .number()
    .positive('Please enter a positive number')
    .integer('Please enter an integer number')
    .max(40, 'Hơn 40 tuổi mà còn đi học ?')
    .required('Please enter your age'),
  mark: yup
    .number()
    .positive('Your mark must be a positive number')
    .max(10, 'Your mark must be a number less than 10')
    .required('Please enter your mark'),
});

export default function StudentForm(props: IStudentFormProps) {
  const { initialValue, onSubmit } = props;
  const { control, handleSubmit, formState: {isSubmitting} } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValue: Student) => {
    await new Promise((res)=>{
      setTimeout(res, 1000)
    })
    if (Boolean(formValue.id)) {
      onSubmit(formValue);
    }
    
    else{
      const student = {
        ...formValue,
        id: uuidv4(),
      };
      onSubmit(student);
    }
    // console.log(student);
  };
  return (
    <Box maxWidth={700}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />
        <InputField name="age" control={control} label="Age" type="number" />
        <RadioGroupField name="gender" control={control} options={options} label="Gender" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <SelectField name="city" control={control} label="City" />
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary"/>}
            &nbsp; Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
