from fastapi import APIRouter, HTTPException
from typing import List
from domain.models.vote import Vote
from service.vote_service import VoteService
router = APIRouter()


@router.get("/votes", response_model=List[Vote])
async def get_votes():
    return VoteService.get_all_votes()


@router.get("/vote/{vote_id}", response_model=Vote)
async def get_vote(vote_id: int):
    vote = VoteService.get_vote_by_id(vote_id)
    if vote is None:
        raise HTTPException(status_code=404, detail="Vote not found")
    return vote
