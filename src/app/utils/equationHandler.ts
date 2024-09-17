import { useState } from 'react';
import { solveEquation } from './equationSolver';

interface EquationResult {
  x?: string;
  x1?: string;
  x2?: string;
  error?: string;
}

export const useEquationHandler = () => {
  const [result, setResult] = useState<EquationResult | null>(null);

  const handleEquationSubmit = (data: any) => {
    const { a, b, c } = data;
    const result = solveEquation(parseFloat(a), parseFloat(b), parseFloat(c));
    setResult(result);
  };

  return { result, handleEquationSubmit };
};