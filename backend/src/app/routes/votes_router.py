from fastapi import APIRouter, HTTPException
from typing import List
from domain.models.vote import Vote
from domain.database.database import votes_df
router = APIRouter()


@router.get("/votes", response_model=List[Vote])
async def get_votes():
    return [Vote(id=row['id'], bill_id=row['bill_id']) for _, row in votes_df.iterrows()]


@router.get("/vote/{vote_id}", response_model=Vote)
async def get_vote(vote_id: int):
    vote = votes_df[votes_df['id'] == vote_id]
    if len(vote) == 0:
        raise HTTPException(status_code=404, detail="Vote not found")
    return Vote(id=vote_id, bill_id=vote.iloc[0]['bill_id'])
