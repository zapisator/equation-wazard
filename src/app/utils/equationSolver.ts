export interface EquationResultSuccess {
  type: 'success';
  roots: string[];
}

export interface EquationResultError {
  type: 'error';
  error: string;
}

export type EquationResult = EquationResultSuccess | EquationResultError;

export const solveEquation = (a: number, b: number, c: number): EquationResult => {
  if (a === 0) {
    return { 
      type: 'error', 
      error: 'Решение линейных уравнений пока в разработке. Пожалуйста, введите значение a, отличное от 0.' 
    } as EquationResultError;
  }

  const discriminant = b * b - 4 * a * c;

  if (discriminant < 0) {
    return { 
      type: 'error', 
      error: 'Уравнение не имеет вещественных корней' 
    } as EquationResultError;
  }

  if (discriminant === 0) {
    const x = -b / (2 * a);
    return { 
      type: 'success', 
      roots: [`x = ${x.toFixed(1)}`] 
    } as EquationResultSuccess;
  }

  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  return { 
    type: 'success', 
    roots: [`x1 = ${x1.toFixed(1)}`, `x2 = ${x2.toFixed(1)}`] 
  } as EquationResultSuccess;
};