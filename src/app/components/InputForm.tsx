'use client';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputY from './InputY';
import Graph from './Graph';
import { GraphDataPoint } from '../utils/interfaces';
import { solveEquation } from '../utils/equationSolver';

export default function InputForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [y, setY] = useState<number | null>(null);
  const [showGraph, setShowGraph] = useState(false);
  const [coefficients, setCoefficients] = useState<{ a: number; b: number; c: number } | null>(null);
  const [result, setResult] = useState<any>(null);

  const onSubmit = (data: any) => {
    const { a, b, c } = data;
    const parsedCoefficients = {
      a: parseFloat(a),
      b: parseFloat(b),
      c: parseFloat(c)
    };
    setCoefficients(parsedCoefficients);
    setResult(solveEquation(parsedCoefficients.a, parsedCoefficients.b, parsedCoefficients.c));
  };

  const handleDrawGraph = () => {
    if (y !== null && coefficients) {
      setShowGraph(true);
    } else {
      alert('Пожалуйста, введите значение y и рассчитайте уравнение.');
    }
  };

  const generateGraphData = (): GraphDataPoint[] => {
    if (!result || result.error || !coefficients) {
      return [];
    }

    const { a, b, c } = coefficients;
    const data: GraphDataPoint[] = [];
    let minX = -5;
    let maxX = 5;

    if (result.x) {
      minX = Math.min(minX, parseFloat(result.x.split('=')[1]));
      maxX = Math.max(maxX, parseFloat(result.x.split('=')[1]));
    }
    if (result.x1) {
      minX = Math.min(minX, parseFloat(result.x1.split('=')[1]));
      maxX = Math.max(maxX, parseFloat(result.x1.split('=')[1]));
    }
    if (result.x2) {
      minX = Math.min(minX, parseFloat(result.x2.split('=')[1]));
      maxX = Math.max(maxX, parseFloat(result.x2.split('=')[1]));
    }

    const step = 0.1;

    for (let x = minX; x <= maxX; x += step) {
      const calculatedY = a * x * x + b * x + c;
      data.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(calculatedY.toFixed(2)) });
    }

    return data;
  };

  const getRoots = (): number[] => {
    const roots: number[] = [];
    if (result.x) {
      roots.push(parseFloat(result.x.split('=')[1]));
    }
    if (result.x1) {
      roots.push(parseFloat(result.x1.split('=')[1]));
    }
    if (result.x2) {
      roots.push(parseFloat(result.x2.split('=')[1]));
    }
    return roots;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="a"
          type="number"
          {...register('a', { required: true, valueAsNumber: true })}
          error={!!errors.a}
          helperText={errors.a?.message}
        />
        <TextField
          label="b"
          type="number"
          {...register('b', { required: true, valueAsNumber: true })}
          error={!!errors.b}
          helperText={errors.b?.message}
        />
        <TextField
          label="c"
          type="number"
          {...register('c', { required: true, valueAsNumber: true })}
          error={!!errors.c}
          helperText={errors.c?.message}
        />
        <Button variant="contained" type="submit">
          Рассчитать
        </Button>
      </form>

      {result && (
        <div>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              {result.x && <p>{result.x}</p>}
              {result.x1 && <p>{result.x1}</p>}
              {result.x2 && <p>{result.x2}</p>}
              {/* Отображаем InputY, если есть хотя бы один корень */}
              {(result.x || result.x1 || result.x2) && <InputY onChange={(value) => setY(value)} />}
            </>
          )}
          <Button
            variant="contained"
            onClick={handleDrawGraph}
            disabled={y === null || !coefficients}
          >
            Нарисовать график
          </Button>
        </div>
      )}

      {showGraph && coefficients && (
        <Graph
          data={generateGraphData()}
          roots={getRoots()}
          yValue={y}
        />
      )}
    </div>
  );
}