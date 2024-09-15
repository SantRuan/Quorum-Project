import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabPanel } from '../../components/TabPanel';

describe('TabPanel', () => {
  it('renders children when value matches index', () => {
    render(
      <TabPanel value={0} index={0}>
        Test Content
      </TabPanel>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render children when value does not match index', () => {
    render(
      <TabPanel value={1} index={0}>
        Test Content
      </TabPanel>
    );
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(
      <TabPanel value={0} index={0}>
        Test Content
      </TabPanel>
    );
    const tabPanel = screen.getByRole('tabpanel');
    expect(tabPanel).toHaveAttribute('id', 'simple-tabpanel-0');
    expect(tabPanel).toHaveAttribute('aria-labelledby', 'simple-tab-0');
  });
});