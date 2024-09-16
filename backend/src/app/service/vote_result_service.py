from typing import List
from domain.interfaces.IVoteResultService import IVoteResultService
from domain.models.vote_result import VoteResult
from domain.database.database import vote_results_df


class VoteResultService(IVoteResultService):
    @staticmethod
    def get_all_vote_results() -> List[VoteResult]:
        return [VoteResult(
            id=row['id'],
            legislator_id=row['legislator_id'],
            vote_id=row['vote_id'],
            vote_type=row['vote_type']
        ) for _, row in vote_results_df.iterrows()]

    @staticmethod
    def get_vote_result_by_id(vote_result_id: int) -> VoteResult:
        vote_result = vote_results_df[vote_results_df['id'] == vote_result_id]
        if len(vote_result) == 0:
            return None
        return VoteResult(
            id=vote_result_id,
            legislator_id=vote_result.iloc[0]['legislator_id'],
            vote_id=vote_result.iloc[0]['vote_id'],
            vote_type=vote_result.iloc[0]['vote_type']
        )
