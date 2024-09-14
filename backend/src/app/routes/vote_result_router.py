from fastapi import APIRouter, HTTPException
from typing import List
from domain.models.vote_result import VoteResult
from service.vote_result_service import VoteResultService
router = APIRouter()


@router.get("/vote_results", response_model=List[VoteResult])
async def get_vote_results():
    return VoteResultService.get_all_vote_results()


@router.get("/vote_result/{vote_result_id}", response_model=VoteResult)
async def get_vote_result(vote_result_id: int):
    vote_result = VoteResultService.get_vote_result_by_id(vote_result_id)
    if vote_result is None:
        raise HTTPException(status_code=404, detail="Vote result not found")
    return vote_result
