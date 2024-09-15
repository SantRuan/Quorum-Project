import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LegislatorVotesTable } from '../../components/LegislatorVotesTable';

describe('LegislatorVotesTable', () => {
  it('renders the table headers', () => {
    const legislatorVotes = [
      { name: 'John Doe', supported: 5, opposed: 3 },
    ];
    render(<LegislatorVotesTable legislatorVotes={legislatorVotes} />);
    expect(screen.getByText('Legislator')).toBeInTheDocument();
    expect(screen.getByText('Supported Bills')).toBeInTheDocument();
    expect(screen.getByText('Opposed Bills')).toBeInTheDocument();
  });
});