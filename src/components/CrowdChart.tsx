
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatTime } from '../utils/helpers';

interface CrowdChartProps {
  crowdData: { [key: string]: number };
}

const CrowdChart: React.FC<CrowdChartProps> = ({ crowdData }) => {
  const data = Object.entries(crowdData)
    .map(([time, level]) => ({
      time,
      formattedTime: formatTime(time),
      level,
      status: level < 40 ? 'Low' : level < 70 ? 'Medium' : 'High'
    }))
    .sort((a, b) => {
      const hourA = parseInt(a.time.split(':')[0]);
      const hourB = parseInt(b.time.split(':')[0]);
      return hourA - hourB;
    });

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="formattedTime" tick={{ fontSize: 12 }} />
          <YAxis
            tickCount={5}
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            formatter={(value) => [`${value}% occupancy`, 'Crowd Level']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Bar
            dataKey="level"
            barSize={20}
            radius={[4, 4, 0, 0]}
            fill={(entry: any) => {
              const level = entry.level;
              if (level < 40) return '#22c55e';  // green for low
              if (level < 70) return '#eab308';  // yellow for medium
              return '#ef4444';  // red for high
            }}
            name="Crowd Level"
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center mt-2 space-x-6">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
          <span className="text-xs text-gray-600">Low (0-40%)</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
          <span className="text-xs text-gray-600">Medium (40-70%)</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
          <span className="text-xs text-gray-600">High (70-100%)</span>
        </div>
      </div>
    </div>
  );
};

export default CrowdChart;
