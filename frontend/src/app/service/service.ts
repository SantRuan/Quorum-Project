import axios from 'axios';
import { Bill } from '@/app/interfaces/Bill';
import { Legislator } from '@/app/interfaces/Legislator';
import { Vote } from '@/app/interfaces/Vote';
import { VoteResult } from '@/app/interfaces/VoteResult';
import { BillVote } from '@/app/interfaces/BillVote';
import { LegislatorVote } from '@/app/interfaces/LegislatorVote';
import { STRINGS } from '../constants/strings';

const API_BASE_URL = 'http://localhost:8000/';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getLegislators = async (): Promise<Legislator[]> => {
  const response = await api.get('/legislators');
  return response.data;
};

export const getLegislator = async (legislatorId: number): Promise<Legislator> => {
  const response = await api.get(`/legislator/${legislatorId}`);
  return response.data;
};

export const getBills = async (): Promise<Bill[]> => {
  const response = await api.get('/bills');
  return response.data;
};

export const getBill = async (billId: number): Promise<Bill> => {
  const response = await api.get(`/bill/${billId}`);
  return response.data;
};

export const getVotes = async (): Promise<Vote[]> => {
  const response = await api.get('/votes');
  return response.data;
};

export const getVote = async (voteId: number): Promise<Vote> => {
  const response = await api.get(`/vote/${voteId}`);
  return response.data;
};

export const getVoteResults = async (): Promise<VoteResult[]> => {
  const response = await api.get('/vote_results');
  return response.data;
};

export const getVoteResult = async (voteResultId: number): Promise<VoteResult> => {
  const response = await api.get(`/vote_result/${voteResultId}`);
  return response.data;
};


export const transformLegislatorsToLegislatorVotes = (legislators: Legislator[]): LegislatorVote[] => {
  return legislators.map(legislator => ({
    name: legislator.name,
    supported: legislator.supported_bills,
    opposed: legislator.opposed_bills,
  }));
};

export const transformBillsToBillVotes = (bills: Bill[]): BillVote[] => {
  return bills.map(bill => ({
    title: bill.title,
    supported: bill.supporters,
    opposed: bill.opposers,
    primarySponsor: bill.primary_sponsor,
  }));
};

export const getLegislatorByName = async (name: string): Promise<Legislator> => {
    const response = await api.get(`/legislators?name=${encodeURIComponent(name)}`);
    if (response.data.length === 0) {
      throw new Error(STRINGS.ERROR.LEGISLATOR_NOT_FOUND);
    }
    return response.data[0];
  };
  
  
  
  export interface LegislatorVoteDetails {
    id: number;
    billTitle: string;
    voteType: number;
  }
  
  export const getLegislatorVotes = async (legislatorId: number): Promise<LegislatorVoteDetails[]> => {
    try {
      const [voteResultsResponse, votesResponse, billsResponse] = await Promise.all([
        api.get('/vote_results'),
        api.get('/votes'),
        api.get('/bills')
      ]);
  
      const voteResults: VoteResult[] = voteResultsResponse.data;
      const votes: Vote[] = votesResponse.data;
      const bills: Bill[] = billsResponse.data;
  
      const legislatorVoteResults = voteResults.filter(vr => vr.legislator_id === legislatorId);
  
      const legislatorVotes: LegislatorVoteDetails[] = legislatorVoteResults.map(vr => {
        const vote = votes.find(v => v.id === vr.vote_id);
        const bill = vote ? bills.find(b => b.id === vote.bill_id) : undefined;
  
        return {
          id: vr.id,
          billTitle: bill?.title || STRINGS.ERROR.TITLE_NOT_FOUND,
          voteType: vr.vote_type
        };
      });
  
      return legislatorVotes;
    } catch (error) {
      console.error(STRINGS.ERROR.FETCH_VOTES, error);
      throw new Error(STRINGS.ERROR.FETCH_VOTES);
    }
  };