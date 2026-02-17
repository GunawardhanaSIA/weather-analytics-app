import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React from 'react';

const data = [
  { day: '17/02', temperature: 25 },
  { day: '17/02', temperature: 27 },
  { day: '17/02', temperature: 24 },
  { day: '17/02', temperature: 26 },
  { day: '17/02', temperature: 28 },
  { day: '17/02', temperature: 27 },
  { day: '17/02', temperature: 25 },
];

const Chart = () => {
  return (
    <div className="overflow-x-auto">
      <LineChart
        width={700}
        height={380}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" label={{ value: 'Day of Week', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default Chart;
