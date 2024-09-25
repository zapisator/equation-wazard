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
} from 'recharts';
import { GraphDataPoint } from '../utils/interfaces';

interface GraphProps {
  data: GraphDataPoint[];
  roots: number[];
  yValue: number;
}

const Graph: React.FC<GraphProps> = ({ data, roots, yValue }) => {
  return (
    <LineChart width={600} height={400} data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
      <XAxis
        dataKey="x"
        axisLine={{ stroke: 'black', strokeWidth: 2 }}
        tickLine={false}
        tickCount={10}
        label={{ value: 'X', position: 'end', offset: 10, fontWeight: 'bold' }}
        type="number"
        domain={['dataMin', 'dataMax']}
      />
      <YAxis
        dataKey="y"
        axisLine={{ stroke: 'black', strokeWidth: 2 }}
        tickLine={false}
        tickCount={8}
        label={{ value: 'Y', angle: -90, position: 'end', offset: 10, fontWeight: 'bold' }}
        type="number"
        domain={['dataMin', 'dataMax']}
      />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="y" stroke="#ff7300" dot={false} />
      <Tooltip
        formatter={(value: number) => value.toFixed(2)} 
        labelFormatter={(label) => `x: ${label.toFixed(2)}`}
      />

      {roots.map((root, index) => (
        <ReferenceDot key={index} x={root} y={yValue} stroke="red" fill="red" r={5} />
      ))}
    </LineChart>
  );
};

export default Graph;