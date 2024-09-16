from fastapi import APIRouter, HTTPException
from typing import List
from domain.dtos.vote import VoteDto
from service.vote_service import VoteService
router = APIRouter()


@router.get("/votes", response_model=List[VoteDto])
async def get_votes():
    try:
        return VoteService.get_all_votes()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/vote/{vote_id}", response_model=VoteDto)
async def get_vote(vote_id: int):
    try:
        vote = VoteService.get_vote_by_id(vote_id)
        if vote is None:
            raise HTTPException(status_code=404, detail="Vote not found")
        return vote
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")
