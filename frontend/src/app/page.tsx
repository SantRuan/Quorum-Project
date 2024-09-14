"use client";

import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, Typography, Tabs, Tab, Box
} from '@mui/material';
import { LegislatorVotesChart } from './components/LegislatorVotesChart';
import { LegislatorVotesTable } from './components/LegislatorVotesTable';
import { BillVotesTable } from './components/BillVotesTable';
import { TabPanel } from './components/TabPanel';
import { fetchLegislatorVotes, fetchBillVotes } from './service/service';
import { BillVote } from '@/interfaces/BillVote';
import { LegislatorVote } from '@/interfaces/LegislatorVote';
import { STRINGS } from './constants/strings';

export default function HomeClient() {
  const [legislatorVotes, setLegislatorVotes] = useState<LegislatorVote[]>([]);
  const [billVotes, setBillVotes] = useState<BillVote[]>([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const legislatorData = await fetchLegislatorVotes();
      const billData = await fetchBillVotes();
      setLegislatorVotes(legislatorData);
      setBillVotes(billData);
    };
    fetchData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {STRINGS.PAGE_TITLE}
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="voting analysis tabs">
        <Tab label={STRINGS.TABS.LEGISLATOR_VOTES} />
        <Tab label={STRINGS.TABS.BILL_VOTES} />
      </Tabs>
      
      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {STRINGS.LEGISLATOR_SECTION.TITLE}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {STRINGS.LEGISLATOR_SECTION.SUBTITLE}
            </Typography>
            <LegislatorVotesChart legislatorVotes={legislatorVotes} />
            <LegislatorVotesTable legislatorVotes={legislatorVotes} />
          </CardContent>
        </Card>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {STRINGS.BILL_SECTION.TITLE}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {STRINGS.BILL_SECTION.SUBTITLE}
            </Typography>
            <BillVotesTable billVotes={billVotes} />
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
}