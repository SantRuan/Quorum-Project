from typing import List
from domain.models.legislator import Legislator
from domain.database.database import legislators_df, get_legislator_stats


class LegislatorService:
    @staticmethod
    def get_all_legislators() -> List[Legislator]:
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

    @staticmethod
    def get_legislator_by_id(legislator_id: int) -> Legislator:
        legislator = legislators_df[legislators_df['id'] == legislator_id]
        if len(legislator) == 0:
            return None
        supported, opposed = get_legislator_stats(legislator_id)
        return Legislator(
            id=legislator_id,
            name=legislator.iloc[0]['name'],
            supported_bills=supported,
            opposed_bills=opposed
        )
