import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LegislatorVote } from '../interfaces/LegislatorVote';

interface LegislatorVotesTableProps {
  legislatorVotes: LegislatorVote[];
}

export const LegislatorVotesTable: React.FC<LegislatorVotesTableProps> = ({ legislatorVotes }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Legislator</TableCell>
            <TableCell>Supported Bills</TableCell>
            <TableCell>Opposed Bills</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {legislatorVotes.map((legislator, index) => (
            <TableRow key={index}>
              <TableCell>{legislator.name}</TableCell>
              <TableCell>{legislator.supported}</TableCell>
              <TableCell>{legislator.opposed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};