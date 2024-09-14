from pydantic import BaseModel


class Legislator(BaseModel):
    id: int
    name: str
    supported_bills: int
    opposed_bills: int
