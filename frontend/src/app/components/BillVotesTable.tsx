import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BillVote } from '../interfaces/BillVote';

interface BillVotesTableProps {
  billVotes: BillVote[];
}

const COLORS = ['#0088FE', '#FF8042'];

export const BillVotesTable: React.FC<BillVotesTableProps> = ({ billVotes }) => {
  const [activeBill, setActiveBill] = useState<BillVote | null>(null);

  useEffect(() => {
    if (billVotes.length > 0 && !activeBill) {
      setActiveBill(billVotes[0]);
    }
  }, [billVotes, activeBill]);

  const handleRowClick = (bill: BillVote) => {
    setActiveBill(bill);
  };

  const pieData = activeBill
    ? [
        { name: 'Supported', value: activeBill.supported },
        { name: 'Opposed', value: activeBill.opposed },
      ]
    : [];

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bill Title</TableCell>
              <TableCell>Supported</TableCell>
              <TableCell>Opposed</TableCell>
              <TableCell>Primary Sponsor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billVotes.map((bill, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowClick(bill)}
                className={`cursor-pointer hover:bg-gray-100 ${
                  activeBill === bill ? 'bg-blue-100' : ''
                }`}
              >
                <TableCell>{bill.title}</TableCell>
                <TableCell>{bill.supported}</TableCell>
                <TableCell>{bill.opposed}</TableCell>
                <TableCell>{bill.primarySponsor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};