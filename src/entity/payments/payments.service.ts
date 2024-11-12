import { baseApi } from "@shared/api/base.api";
import { PaymentsDto } from "./model/payment.interface";

class PaymentsService {
    static async getPaymentsHistory(id: string): Promise<any> {
      const response = await baseApi.get<PaymentsDto>(`payments/user/${id}`);
      return response.data;
    }
}
export default PaymentsService