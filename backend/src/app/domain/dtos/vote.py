from pydantic import BaseModel


class VoteDto(BaseModel):
    id: int
    bill_id: int
