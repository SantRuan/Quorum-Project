import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import { getLegislatorByName, getLegislatorVotes } from '../service/service';
import { Legislator } from '@/app/interfaces/Legislator';
import { LegislatorVoteDetails } from '../service/service';
import { STRINGS } from '../constants/strings';
export function LegislatorSearch() {
    const [inputName, setInputName] = useState('');
    const [legislator, setLegislator] = useState<Legislator | null>(null);
    const [votes, setVotes] = useState<LegislatorVoteDetails[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (legislator) {
        fetchLegislatorVotes();
      }
    }, [legislator]);
  
    const handleSearch = async () => {
      if (inputName) {
        setLoading(true);
        setError(null);
        try {
          const data = await getLegislatorByName(inputName);
          setLegislator(data);
        } catch (err) {
          setLegislator(null);
          setError(STRINGS.ERROR.LEGISLATOR_NOT_FOUND);
        } finally {
          setLoading(false);
        }
      }
    };
  
    const fetchLegislatorVotes = async () => {
      if (legislator) {
        setLoading(true);
        try {
          const votesData = await getLegislatorVotes(legislator.id);
          setVotes(votesData);
        } catch (err) {
          console.error(STRINGS.ERROR.LEGISLATOR_NOT_FOUND, err);
          setError(STRINGS.ERROR.FETCH_VOTES);
        } finally {
          setLoading(false);
        }
      }
    };
  
    return (
      <Box>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="Legislator name"
            variant="outlined"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" onClick={handleSearch} disabled={loading}>
            {STRINGS.LEGISLATOR_SEARCH.SEARCH}
          </Button>
        </Box>
        {loading && <CircularProgress />}
        {error && <Box color="error.main">{error}</Box>}
        {legislator && (
          <Box mt={2}>
            <Typography variant="h4">{legislator.name}</Typography>
            <Typography>ID: {legislator.id}</Typography>
            <Typography>{STRINGS.LEGISLATOR_SEARCH.SUPPORTED_PROJECTS}: {votes.filter(v => v.voteType === 1).length}</Typography>
            <Typography>{STRINGS.LEGISLATOR_SEARCH.OPPOSITE_PROJECTS}: {votes.filter(v => v.voteType === 2).length}</Typography>
            
            <Typography variant="h5" mt={2}>{STRINGS.LEGISLATOR_SEARCH.TITLE}</Typography>
            {votes.length > 0 ? (
              <List>
                {votes.map((vote) => (
                  <ListItem key={vote.id}>
                    <ListItemText 
                      primary={vote.billTitle}
                      secondary={
                        `VOTE: ${vote.voteType === 1 ? 
                        STRINGS.LEGISLATOR_SEARCH.SUPPORTED : 
                        STRINGS.LEGISLATOR_SEARCH.OPOSSITE}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>{STRINGS.LEGISLATOR_SEARCH.NOT_FOUND}</Typography>
            )}
          </Box>
        )}
      </Box>
    );
  }