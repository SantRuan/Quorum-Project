from typing import List
from domain.models.vote import Vote
from domain.database.database import votes_df


class VoteService:
    @staticmethod
    def get_all_votes() -> List[Vote]:
        return [Vote(id=row['id'], bill_id=row['bill_id']) for _, row in votes_df.iterrows()]

    @staticmethod
    def get_vote_by_id(vote_id: int) -> Vote:
        vote = votes_df[votes_df['id'] == vote_id]
        if len(vote) == 0:
            return None
        return Vote(id=vote_id, bill_id=vote.iloc[0]['bill_id'])
