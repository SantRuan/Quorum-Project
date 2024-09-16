from abc import ABC, abstractmethod
from typing import List, Optional
from domain.models.bill import Bill


# Interface abstrata para o BillService
class IBillService(ABC):
    @abstractmethod
    def get_all_bills(self) -> List[Bill]:
        pass

    @abstractmethod
    def get_bill_by_id(self, bill_id: int) -> Optional[Bill]:
        pass
