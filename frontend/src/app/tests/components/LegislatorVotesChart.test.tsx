import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LegislatorVotesChart } from '../../components/LegislatorVotesChart';

describe('LegislatorVotesChart', () => {
  it('renders without crashing', () => {
    const legislatorVotes = [
      { name: 'John Doe', supported: 5, opposed: 3 },
    ];
    const { container } = render(<LegislatorVotesChart legislatorVotes={legislatorVotes} />);
    expect(container).toBeInTheDocument();
  });
});