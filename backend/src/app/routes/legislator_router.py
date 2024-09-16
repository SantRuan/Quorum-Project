
from domain.dtos.legislator_dto import LegislatorDto
from service.legislator_service import LegislatorService
from typing import List
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/legislators", response_model=List[LegislatorDto])
async def get_legislators():
    try:
        return LegislatorService.get_all_legislators()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/legislator/{legislator_id}", response_model=LegislatorDto)
async def get_legislator(legislator_id: int):
    try:
        legislator = LegislatorService.get_legislator_by_id(legislator_id)
        if legislator is None:
            raise HTTPException(status_code=404, detail="Legislator not found")
        return legislator
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")
