
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatTime } from '../utils/helpers';

interface CrowdChartProps {
  crowdData: Record<string, number>;
}

const CrowdChart: React.FC<CrowdChartProps> = ({ crowdData }) => {
  // Convert object data to array format for recharts
  const chartData = Object.entries(crowdData || {}).map(([time, level]) => ({
    time,
    level,
  }));

  // Sort data by time
  chartData.sort((a, b) => {
    const timeA = parseInt(a.time.split(':')[0]);
    const timeB = parseInt(b.time.split(':')[0]);
    return timeA - timeB;
  });

  // Define crowd level colors
  const getCrowdLevelColor = (level: number) => {
    if (level < 30) return "#22c55e"; // Green for low crowd
    if (level < 70) return "#eab308"; // Yellow for medium crowd
    return "#ef4444"; // Red for high crowd
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="time" 
            tickFormatter={formatTime}
            angle={-45}
            textAnchor="end"
            height={50}
            tickMargin={5}
          />
          <YAxis 
            domain={[0, 100]} 
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            formatter={(value) => [`${value}% crowded`, 'Crowd Level']}
            labelFormatter={formatTime}
          />
          <Bar 
            dataKey="level" 
            name="Crowd Level" 
            radius={[4, 4, 0, 0]}
            fill={(entry) => getCrowdLevelColor(entry.level)}
            stroke=""
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CrowdChart;
