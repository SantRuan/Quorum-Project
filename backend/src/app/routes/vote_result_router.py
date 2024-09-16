from fastapi import APIRouter, HTTPException
from typing import List
from domain.dtos.vote_result import VoteResultDto
from service.vote_result_service import VoteResultService
router = APIRouter()


@router.get("/vote_results", response_model=List[VoteResultDto])
async def get_vote_results():
    try:
        return VoteResultService.get_all_vote_results()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/vote_result/{vote_result_id}", response_model=VoteResultDto)
async def get_vote_result(vote_result_id: int):
    try:
        vote_result = VoteResultService.get_vote_result_by_id(vote_result_id)
        if vote_result is None:
            raise HTTPException(
                status_code=404, detail="Vote result not found")
        return vote_result
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")
