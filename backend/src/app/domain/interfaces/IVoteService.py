from abc import ABC, abstractmethod
from typing import List, Optional
from domain.models.vote import Vote


class IVoteService(ABC):
    @abstractmethod
    def get_all_votes(self) -> List[Vote]:
        pass

    @abstractmethod
    def get_vote_by_id(self, vote_id: int) -> Optional[Vote]:
        pass
