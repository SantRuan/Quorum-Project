import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';
import { LegislatorVote } from '../interfaces/LegislatorVote';

interface LegislatorVotesChartProps {
  legislatorVotes: LegislatorVote[];
}

export const LegislatorVotesChart: React.FC<LegislatorVotesChartProps> = ({ legislatorVotes }) => {
  const chartData = legislatorVotes.map(({ name, supported, opposed }) => ({
    name,
    Supported: supported,
    Opposed: opposed,
  }));

  return (
    <Box sx={{ height: 300, mt: 2 }}>
      <BarChart
        dataset={chartData}
        xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
        series={[
          { dataKey: 'Supported', label: 'Supported', color: '#82ca9d' },
          { dataKey: 'Opposed', label: 'Opposed', color: '#8884d8' },
        ]}
      />
    </Box>
  );
};