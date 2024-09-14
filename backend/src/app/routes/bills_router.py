from fastapi import APIRouter, HTTPException
from typing import List
from domain.models.bill import Bill
from domain.database.database import bills_df, legislators_df, get_bill_stats

router = APIRouter()


@router.get("/bills", response_model=List[Bill])
async def get_bills():
    bills = []
    for _, row in bills_df.iterrows():
        supporters, opposers = get_bill_stats(row['id'])
        sponsor = legislators_df[legislators_df['id'] == row['sponsor_id']]
        if len(sponsor) > 0:
            primary_sponsor = sponsor.iloc[0]['name']
        else:
            primary_sponsor = "Unknown"
        bills.append(Bill(
            id=row['id'],
            title=row['title'],
            supporters=supporters,
            opposers=opposers,
            primary_sponsor=primary_sponsor
        ))
    return bills


@router.get("/bill/{bill_id}", response_model=Bill)
async def get_bill(bill_id: int):
    bill = bills_df[bills_df['id'] == bill_id]
    if len(bill) == 0:
        raise HTTPException(status_code=404, detail="Bill not found")
    supporters, opposers = get_bill_stats(bill_id)
    sponsor = legislators_df[legislators_df['id']
                             == bill.iloc[0]['sponsor_id']]
    if len(sponsor) > 0:
        primary_sponsor = sponsor.iloc[0]['name']
    else:
        primary_sponsor = "Unknown"
    return Bill(
        id=bill_id,
        title=bill.iloc[0]['title'],
        supporters=supporters,
        opposers=opposers,
        primary_sponsor=primary_sponsor
    )
