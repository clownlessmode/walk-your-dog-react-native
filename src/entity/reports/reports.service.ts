import { ServiceCreateRo } from '@entity/service/model/service.interface';
import { baseApi } from '@shared/api/base.api';
import { ReportsDto } from './model/reports.interface';


class ReportService {
  static async reportAttach(serviceId: string, dto: ReportsDto): Promise<any> {
    const response = await baseApi.post(`reports/${serviceId}/attach`, dto);
    return response.data;
  }
  static async reportClose(serviceId: string): Promise<any> {
    const response = await baseApi.post(`reports/${serviceId}/close`);
    return response.data;
  }
  static async reportWaiting(id: string): Promise<any> {
    const response = await baseApi.get<ServiceCreateRo>(`reports/worker/reports/${id}`);
    return response.data;
  }
}
export default ReportService;
