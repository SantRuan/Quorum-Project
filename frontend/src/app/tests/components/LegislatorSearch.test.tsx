import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LegislatorSearch } from '../../components/LegislatorSearch';

describe('LegislatorSearch', () => {
  it('renders the search input and button', () => {
    render(<LegislatorSearch />);
    expect(screen.getByLabelText('Legislator name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SEARCH' })).toBeInTheDocument();
  });
});