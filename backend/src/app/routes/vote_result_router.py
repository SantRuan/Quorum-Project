from fastapi import APIRouter
from typing import List
from domain.models.vote_result import VoteResult

router = APIRouter()


@router.get("/vote_results", response_model=List[VoteResult])
async def get_vote_results():
    return []


@router.get("/vote_result/{vote_result_id}", response_model=VoteResult)
async def get_vote_result(vote_result_id: int):
    return []
