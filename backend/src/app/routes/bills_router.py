from fastapi import APIRouter, HTTPException
from typing import List
from domain.models.bill import Bill
from service.bill_service import BillService
router = APIRouter()


@router.get("/bills", response_model=List[Bill])
async def get_bills():
    return BillService.get_all_bills()


@router.get("/bill/{bill_id}", response_model=Bill)
async def get_bill(bill_id: int):
    bill = BillService.get_bill_by_id(bill_id)
    if bill is None:
        raise HTTPException(status_code=404, detail="Bill not found")
    return bill
