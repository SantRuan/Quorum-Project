from fastapi import APIRouter, HTTPException
from typing import List
from domain.dtos.bill_dto import BillDto
from service.bill_service import BillService
router = APIRouter()


@router.get("/bills", response_model=List[BillDto])
async def get_bills():
    try:
        return BillService.get_all_bills()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/bill/{bill_id}", response_model=BillDto)
async def get_bill(bill_id: int):
    try:
        bill = BillService.get_bill_by_id(bill_id)
        if bill is None:
            raise HTTPException(status_code=404, detail="Bill not found")
        return bill
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")
