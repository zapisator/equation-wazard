'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ReferenceArea,
} from 'recharts';
import { GraphDataPoint } from '../utils/interfaces';

interface GraphProps {
  data: GraphDataPoint[];
  roots: number[];
  yValue: number | null;
}

const Graph: React.FC<GraphProps> = ({ data, roots, yValue }) => {
  return (
    <LineChart width={600} height={400} data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
      <XAxis
        dataKey="x"
        tickFormatter={(value) => value.toFixed(0)}
        axisLine={{ stroke: 'black', strokeWidth: 2 }}
        tickLine={false}
        label={{ value: 'X', position: 'end', offset: 10, fontWeight: 'bold' }}
      />
      <YAxis
        tickFormatter={(value) => value.toFixed(0)}
        axisLine={{ stroke: 'black', strokeWidth: 2 }}
        tickLine={false}
        label={{ value: 'Y', angle: -90, position: 'end', offset: 10, fontWeight: 'bold' }}
      />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="y" stroke="#ff7300" dot={false} />
      <Tooltip
          formatter={(value, name) => `${value.toFixed(2)}`}
          labelFormatter={(label) => `x: ${label.toFixed(2)}`}
      />
      {/* Отображаем точки для корней уравнения */}
      {roots.map((root, index) => (
        <ReferenceDot key={index} x={root} y={yValue} stroke="red" fill="red" r={5} />
      ))}

      {/* Отображаем точку для введенного значения y, если оно задано */}
      {yValue !== null && <ReferenceDot x={0} y={yValue} stroke="blue" fill="blue" r={5} />}

      {/* Добавляем стрелки для осей */}
      <ReferenceArea x1={-5} x2={5} y1={0} y2={0} stroke="black" strokeWidth={2} />
      <ReferenceArea x1={0} x2={0} y1={-12} y2={36} stroke="black" strokeWidth={2} />
    </LineChart>
  );
};

export default Graph;