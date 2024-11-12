import { baseApi } from '@shared/api/base.api';
import { BalanceDto } from './model/refill.interface';

class RefillService {
  static async Balance(id: string, data: BalanceDto): Promise<any> {
    const response = await baseApi.post(`balance/${id}`, data);
    return response.data;
  }
}
export default RefillService;
