from fastapi import APIRouter, HTTPException
from typing import List
from domain.models.vote_result import VoteResult
from domain.database.database import vote_results_df

router = APIRouter()


@router.get("/vote_results", response_model=List[VoteResult])
async def get_vote_results():
    return [VoteResult(
        id=row['id'],
        legislator_id=row['legislator_id'],
        vote_id=row['vote_id'],
        vote_type=row['vote_type']
    ) for _, row in vote_results_df.iterrows()]


@router.get("/vote_result/{vote_result_id}", response_model=VoteResult)
async def get_vote_result(vote_result_id: int):
    vote_result = vote_results_df[vote_results_df['id'] == vote_result_id]
    if len(vote_result) == 0:
        raise HTTPException(status_code=404, detail="Vote result not found")
    return VoteResult(
        id=vote_result_id,
        legislator_id=vote_result.iloc[0]['legislator_id'],
        vote_id=vote_result.iloc[0]['vote_id'],
        vote_type=vote_result.iloc[0]['vote_type']
    )
