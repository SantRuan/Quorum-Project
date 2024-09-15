import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Button, Typography } from '@mui/material';
import { LegislatorVote } from '../interfaces/LegislatorVote';
import { LegislatorVoteDetails } from '../service/service';

interface LegislatorVotesTableProps {
  legislatorVotes: LegislatorVote[];
  voteDetails: { [legislatorName: string]: LegislatorVoteDetails[] };
}

export const LegislatorVotesTable: React.FC<LegislatorVotesTableProps> = ({ legislatorVotes, voteDetails }) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const toggleRow = (legislatorName: string) => {
    setExpandedRows(prev => ({ ...prev, [legislatorName]: !prev[legislatorName] }));
  };

  const getBillNames = (legislatorName: string, voteType: 'supported' | 'opposed'): string => {
    return voteDetails[legislatorName]
      ?.filter(vote => (voteType === 'supported' ? vote.voteType === 1 : vote.voteType !== 1))
      .map(vote => vote.billTitle)
      .join(", ") || "";
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Legislator</TableCell>
            <TableCell>Supported Bills</TableCell>
            <TableCell>Opposed Bills</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {legislatorVotes.map((legislator) => (
            <React.Fragment key={legislator.name}>
              <TableRow>
                <TableCell>{legislator.name}</TableCell>
                <TableCell>
                  {getBillNames(legislator.name, 'supported')}
                </TableCell>
                <TableCell>
                  {getBillNames(legislator.name, 'opposed')}
                </TableCell>
                <TableCell>
                  <Button onClick={() => toggleRow(legislator.name)}>
                    {expandedRows[legislator.name] ? 'Hide Details' : 'Show Details'}
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                  <Collapse in={expandedRows[legislator.name]} timeout="auto" unmountOnExit>
                    <Typography variant="h6" gutterBottom component="div">
                      Bill Details
                    </Typography>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Bill Title</TableCell>
                          <TableCell>Vote</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {voteDetails[legislator.name]?.map((vote, index) => (
                          <TableRow key={index}>
                            <TableCell>{vote.billTitle}</TableCell>
                            <TableCell>{vote.voteType === 1 ? 'Supported' : 'Opposed'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};