from pydantic import BaseModel


class Bill(BaseModel):
    id: int
    title: str
    supporters: int
    opposers: int
    primary_sponsor: str
