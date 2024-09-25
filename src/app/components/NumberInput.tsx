'use client';

import TextField from '@mui/material/TextField';
import { CoefficientsInput } from '../utils/interfaces';
import { UseFormRegister, FieldErrors } from 'react-hook-form'; 

interface NumberInputProps {
  label: string;
  name: "a" | "b" | "c";
  register: UseFormRegister<CoefficientsInput>; 
  errors: FieldErrors<CoefficientsInput>; 
}

const NumberInput: React.FC<NumberInputProps> = ({ label, name, register, errors }) => {
  return (
    <TextField
      label={label}
      type="number"
      {...register(name, { required: true, valueAsNumber: true })}
      error={!!errors[name]}
      helperText={errors[name]?.message}
    />
  );
};

export default NumberInput;