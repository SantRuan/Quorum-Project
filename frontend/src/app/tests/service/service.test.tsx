// service.test.ts
import * as service from '../../service/service';
import { Bill } from '../../interfaces/Bill';
import { Legislator } from '../../interfaces/Legislator'

jest.mock('../../service/service');

describe('Service API tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all legislators', async () => {
    const legislators: Legislator[] = [{ id: 1, name: 'John Doe', supported_bills: 1, opposed_bills: 2 }];
    (service.getLegislators as jest.Mock).mockResolvedValue(legislators);

    const result = await service.getLegislators();
    expect(result).toEqual(legislators);
    expect(service.getLegislators).toHaveBeenCalled();
  });

  it('should fetch all bills', async () => {
    const bills: Bill[] = [{ id: 1, title: 'Bill 1', supporters: 10, opposers: 5, primary_sponsor: '' }];
    (service.getBills as jest.Mock).mockResolvedValue(bills);

    const result = await service.getBills();
    expect(result).toEqual(bills);
    expect(service.getBills).toHaveBeenCalled();
  });

  it('should fetch a single bill by id', async () => {
    const bill: Bill = { id: 1, title: 'Bill 1', supporters: 10, opposers: 5, primary_sponsor: '' };
    (service.getBill as jest.Mock).mockResolvedValue(bill);

    const result = await service.getBill(1);
    expect(result).toEqual(bill);
    expect(service.getBill).toHaveBeenCalledWith(1);
  });
});