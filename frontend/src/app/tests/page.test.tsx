import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeClient from '../page';
import * as service from '../service/service';
import { STRINGS } from '../constants/strings';

jest.mock('../service/service');
jest.mock('../components/LegislatorVotesChart', () => ({
  LegislatorVotesChart: () => <div data-testid="legislator-votes-chart" />
}));
jest.mock('../components/LegislatorVotesTable', () => ({
  LegislatorVotesTable: () => <div data-testid="legislator-votes-table" />
}));
jest.mock('../components/BillVotesTable', () => ({
  BillVotesTable: () => <div data-testid="bill-votes-table" />
}));
jest.mock('../components/LegislatorSearch', () => ({
  LegislatorSearch: () => <div data-testid="legislator-search" />
}));


describe('HomeClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (service.getLegislators as jest.Mock).mockResolvedValue([]);
    (service.getBills as jest.Mock).mockResolvedValue([]);
  });

  it('renders the page title', async () => {
    await act(async () => {
      render(<HomeClient />);
    });
    expect(screen.getByText(STRINGS.PAGE_TITLE)).toBeInTheDocument();
  });

  it('renders all tabs', async () => {
    await act(async () => {
      render(<HomeClient />);
    });
    expect(screen.getByText(STRINGS.TABS.LEGISLATOR_VOTES)).toBeInTheDocument();
    expect(screen.getByText(STRINGS.TABS.BILL_VOTES)).toBeInTheDocument();
    expect(screen.getByText(STRINGS.TABS.SEARCH_LEGISLATOR)).toBeInTheDocument();
  });

  it('fetches data on mount', async () => {
    await act(async () => {
      render(<HomeClient />);
    });
    expect(service.getLegislators).toHaveBeenCalledTimes(1);
    expect(service.getBills).toHaveBeenCalledTimes(1);
  });

  it('switches tabs when clicked', async () => {
    await act(async () => {
      render(<HomeClient />);
    });
    expect(screen.getByTestId('legislator-votes-chart')).toBeInTheDocument();

    await userEvent.click(screen.getByText(STRINGS.TABS.BILL_VOTES));
    expect(screen.getByTestId('bill-votes-table')).toBeInTheDocument();

    await userEvent.click(screen.getByText(STRINGS.TABS.SEARCH_LEGISLATOR));
    expect(screen.getByTestId('legislator-search')).toBeInTheDocument();
  });

  it('handles error when fetching data', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Fetch error');
    (service.getLegislators as jest.Mock).mockRejectedValue(error);

    await act(async () => {
      render(<HomeClient />);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching data:', error);
    consoleErrorSpy.mockRestore();
  });
});