import { BillVote } from "@/interfaces/BillVote";
import { LegislatorVote } from "@/interfaces/LegislatorVote";


export const fetchLegislatorVotes = async (): Promise<LegislatorVote[]> => {

    return [
      { name: 'John Doe', supported: 10, opposed: 5 },
      { name: 'Jane Smith', supported: 8, opposed: 7 },

    ];
  };
  
  export const fetchBillVotes = async (): Promise<BillVote[]> => {
    return [
      { title: 'Bill A', supported: 15, opposed: 5, primarySponsor: 'John Doe' },
      { title: 'Bill B', supported: 12, opposed: 8, primarySponsor: 'Jane Smith' },

    ];
  };
  