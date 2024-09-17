'use client';

import TextField from '@mui/material/TextField';
import React from 'react';

interface InputYProps {
  onChange: (value: number) => void;
}

export default function InputY({ onChange }: InputYProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    onChange(value);
  };

  return (
    <TextField
      label="y"
      type="number"
      id="y"
      name="y"
      onChange={handleChange}
    />
  );
}