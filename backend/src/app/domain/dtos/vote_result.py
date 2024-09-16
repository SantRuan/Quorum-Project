from pydantic import BaseModel


class VoteResultDto(BaseModel):
    id: int
    legislator_id: int
    vote_id: int
    vote_type: int
