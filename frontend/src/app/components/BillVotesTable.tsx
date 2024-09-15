import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BillVote } from '../interfaces/BillVote';

interface BillVotesTableProps {
  billVotes: BillVote[];
}

export const BillVotesTable: React.FC<BillVotesTableProps> = ({ billVotes }) => {
  return (
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
            <TableRow key={index}>
              <TableCell>{bill.title}</TableCell>
              <TableCell>{bill.supported}</TableCell>
              <TableCell>{bill.opposed}</TableCell>
              <TableCell>{bill.primarySponsor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};