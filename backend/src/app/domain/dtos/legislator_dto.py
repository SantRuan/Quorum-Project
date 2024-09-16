from pydantic import BaseModel


class LegislatorDto(BaseModel):
    id: int
    name: str
    supported_bills: int
    opposed_bills: int
