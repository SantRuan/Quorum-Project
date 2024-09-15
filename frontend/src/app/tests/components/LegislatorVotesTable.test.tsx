import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LegislatorVotesTable } from '../../components/LegislatorVotesTable';

describe('LegislatorVotesTable', () => {
  it('renders the table headers', () => {
    const legislatorVotes = [
      { name: 'John Doe', supported: 5, opposed: 3 },
    ];

    const voteDetails = {
      'John Doe': [
        { id: 1, billTitle: 'Bill 1', voteType: 1 },
        { id: 2, billTitle: 'Bill 2', voteType: 0 },
      ],
    };

    render(<LegislatorVotesTable legislatorVotes={legislatorVotes} voteDetails={voteDetails} />);
    expect(screen.getByText('Legislator')).toBeInTheDocument();
    expect(screen.getByText('Supported Bills')).toBeInTheDocument();
    expect(screen.getByText('Opposed Bills')).toBeInTheDocument();
  });
});
