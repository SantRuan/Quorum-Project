from fastapi import APIRouter
from typing import List
from domain.models.bill import Bill


router = APIRouter()


@router.get("/bills", response_model=List[Bill])
async def get_bills():
    bills = []
    return bills


@router.get("/bill/{bill_id}", response_model=Bill)
async def get_bill(bill_id: int):

    return []
