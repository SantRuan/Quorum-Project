
from domain.models.legislator import Legislator
from service.legislator_service import LegislatorService
from typing import List
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/legislators", response_model=List[Legislator])
async def get_legislators():
    return LegislatorService.get_all_legislators()


@router.get("/legislator/{legislator_id}", response_model=Legislator)
async def get_legislator(legislator_id: int):
    legislator = LegislatorService.get_legislator_by_id(legislator_id)
    if legislator is None:
        raise HTTPException(status_code=404, detail="Legislator not found")
    return legislator
