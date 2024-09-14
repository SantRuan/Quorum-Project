from fastapi import APIRouter
from typing import List
from domain.models import Vote

router = APIRouter()


@router.get("/votes", response_model=List[Vote])
async def get_votes():
    return []


@router.get("/vote/{vote_id}", response_model=Vote)
async def get_vote(vote_id: int):
    return []
