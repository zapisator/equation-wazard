'use client';

import Button from '@mui/material/Button';
import React, { useReducer } from 'react';
import InputY from './InputY';
import Graph from './Graph';
import { 
  CoefficientsInput, 
  Coefficients, 
  GraphDataPoint
} from '../utils/interfaces';
import { 
  solveEquation, 
  EquationResult
 } from '../utils/equationSolver';
import { 
  initialState, 
  reducer
} from '../utils/equationReducer';
import CoefficientsForm from './CoefficientsForm';

const parseCoefficients = (data: CoefficientsInput): Coefficients => ({
  a: parseFloat(data.a),
  b: parseFloat(data.b),
  c: parseFloat(data.c),
});

const generateGraphData = (coefficients: Coefficients, result: EquationResult): GraphDataPoint[] => {
  if (!coefficients || result.type === 'error') {
    return [];
  }

  const { a, b, c } = coefficients;
  const data: GraphDataPoint[] = [];
  let minX = -5;
  let maxX = 5;

  if (result.type === 'success' && result.roots && result.roots.length === 1) {
    minX = Math.min(minX, parseFloat(result.roots[0].split('=')[1]));
    maxX = Math.max(maxX, parseFloat(result.roots[0].split('=')[1]));
  } else if (result.type === 'success' && result.roots && result.roots.length === 2) {
    minX = Math.min(parseFloat(result.roots[0].split('=')[1]), parseFloat(result.roots[1].split('=')[1]));
    maxX = Math.max(parseFloat(result.roots[0].split('=')[1]), parseFloat(result.roots[1].split('=')[1]));
  }

  const distance = maxX - minX;
  minX -= distance / 2;
  maxX += distance / 2;
  const step = 0.1;

  for (let x = minX; x <= maxX; x += step) {
    const calculatedY = a * x * x + b * x + c;
    data.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(calculatedY.toFixed(2)) });
  }

  return data;
};

const getRoots = (result: EquationResult): number[] => {
  if (result.type === 'success') {
    return result.roots.map((root) => parseFloat(root.split('=')[1]));
  } else {
    return [];
  }
};

export default function InputForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (data: CoefficientsInput) => {
    const parsedCoefficients = parseCoefficients(data);
    dispatch({ type: 'SET_COEFFICIENTS', payload: parsedCoefficients });
    dispatch({ type: 'SET_RESULT', payload: solveEquation(parsedCoefficients.a, parsedCoefficients.b, parsedCoefficients.c) });
  };

  const handleDrawGraph = () => {
    if (state.y !== null && state.coefficients) {
      dispatch({ type: 'SET_SHOW_GRAPH', payload: true });
    } else {
      alert('Пожалуйста, введите значение y и рассчитайте уравнение.');
    }
  };

  return (
    <div>
      <CoefficientsForm onSubmit={onSubmit} /> 

      {state.result && (
        <div>
          {state.result.type === 'error' 
          ? (
            <p>{state.result.error}</p>
          )
          : (
            <>
              {state.result.roots?.map((root: string, index: number) => (
                <p key={index}>{root}</p>
              ))}
              <InputY onChange={(value) => dispatch({ type: 'SET_Y', payload: value })} />
              <Button
                variant="contained"
                onClick={handleDrawGraph}
                disabled={state.y === null}
              >
                Нарисовать график
              </Button>
            </>
          )}
        </div>
      )}

      {state.showGraph && state.coefficients && state.result && state.y && (
        <Graph
          data={generateGraphData(state.coefficients, state.result)}
          roots={getRoots(state.result)}
          yValue={state.y}
        />
      )}
    </div>
  );
}