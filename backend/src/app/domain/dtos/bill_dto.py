from pydantic import BaseModel


class BillDto(BaseModel):
    id: int
    title: str
    supporters: int
    opposers: int
    primary_sponsor: str
