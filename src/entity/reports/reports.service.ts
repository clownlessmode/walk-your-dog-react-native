import { baseApi } from '@shared/api/base.api';


class ReportService {
  static async reportAttach(serviceId: string): Promise<any> {
    const response = await baseApi.post(`reports/${serviceId}/attach`);
    return response.data;
  }
  static async reportClose(serviceId: string): Promise<any> {
    const response = await baseApi.post(`reports/${serviceId}/close`);
    return response.data;
  }
}
export default ReportService;
