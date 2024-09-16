from abc import ABC, abstractmethod
from typing import List, Optional

from domain.models.vote_result import VoteResult


class IVoteResultService(ABC):
    @abstractmethod
    def get_all_vote_results(self) -> List[VoteResult]:
        pass

    @abstractmethod
    def get_vote_result_by_id(self, vote_result_id: int) -> Optional[VoteResult]:
        pass
