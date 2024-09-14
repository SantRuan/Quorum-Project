from typing import List
from domain.models.bill import Bill
from domain.database.database import bills_df, legislators_df, get_bill_stats


class BillService:
    @staticmethod
    def get_all_bills() -> List[Bill]:
        bills = []
        for _, row in bills_df.iterrows():
            supporters, opposers = get_bill_stats(row['id'])
            sponsor = legislators_df[legislators_df['id'] == row['sponsor_id']]
            primary_sponsor = sponsor.iloc[0]['name'] if len(
                sponsor) > 0 else "Unknown"
            bills.append(Bill(
                id=row['id'],
                title=row['title'],
                supporters=supporters,
                opposers=opposers,
                primary_sponsor=primary_sponsor
            ))
        return bills

    @staticmethod
    def get_bill_by_id(bill_id: int) -> Bill:
        bill = bills_df[bills_df['id'] == bill_id]
        if len(bill) == 0:
            return None
        supporters, opposers = get_bill_stats(bill_id)
        sponsor = legislators_df[legislators_df['id']
                                 == bill.iloc[0]['sponsor_id']]
        primary_sponsor = sponsor.iloc[0]['name'] if len(
            sponsor) > 0 else "Unknown"
        return Bill(
            id=bill_id,
            title=bill.iloc[0]['title'],
            supporters=supporters,
            opposers=opposers,
            primary_sponsor=primary_sponsor
        )
