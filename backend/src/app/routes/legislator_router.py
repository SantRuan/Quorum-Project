
from domain.models.legislator import Legislator
from domain.database.database import legislators_df, get_legislator_stats
from typing import List
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/legislators", response_model=List[Legislator])
async def get_legislators():
    legislators = []
    for _, row in legislators_df.iterrows():
        supported, opposed = get_legislator_stats(row['id'])
        legislators.append(Legislator(
            id=row['id'],
            name=row['name'],
            supported_bills=supported,
            opposed_bills=opposed
        ))
    return legislators


@router.get("/legislator/{legislator_id}", response_model=Legislator)
async def get_legislator(legislator_id: int):
    legislator = legislators_df[legislators_df['id'] == legislator_id]
    if len(legislator) == 0:
        raise HTTPException(status_code=404, detail="Legislator not found")
    supported, opposed = get_legislator_stats(legislator_id)
    return Legislator(
        id=legislator_id,
        name=legislator.iloc[0]['name'],
        supported_bills=supported,
        opposed_bills=opposed
    )
