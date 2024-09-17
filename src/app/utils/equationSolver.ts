interface EquationResult {
  x?: string;
  x1?: string;
  x2?: string;
  error?: string;
}

export const solveEquation = (a: number, b: number, c: number): EquationResult => {
  if (a === 0) {
    return { error: 'a не может быть равно 0' };
  }

  const discriminant = b * b - 4 * a * c;

  if (discriminant < 0) {
    return { error: 'Уравнение не имеет вещественных корней' };
  }

  if (discriminant === 0) {
    const x = -b / (2 * a);
    return { x: `x = ${x.toFixed(1)}` };
  }

  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  return { x1: `x1 = ${x1.toFixed(1)}`, x2: `x2 = ${x2.toFixed(1)}` };
};