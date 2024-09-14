
from domain.models.legislator import Legislator
from typing import List
from fastapi import APIRouter


router = APIRouter()


@router.get("/legislators", response_model=List[Legislator])
async def get_legislators():
    legislators = []
    return legislators
