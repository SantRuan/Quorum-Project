from abc import ABC, abstractmethod
from typing import List, Optional

from domain.models.legislator import Legislator


class ILegislatorService(ABC):
    @abstractmethod
    def get_all_legislators(self) -> List[Legislator]:
        pass

    @abstractmethod
    def get_legislator_by_id(self, legislator_id: int) -> Optional[Legislator]:
        pass
