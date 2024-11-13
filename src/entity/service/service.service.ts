import { baseApi } from "@shared/api/base.api";
import { ServiceCreateDto, ServiceCreateRo, ServiceRo } from "./model/service.interface";

class ServiceService {
    static async getServiceCatalog(): Promise<any> {
      const response = await baseApi.get(`service/catalog`);
      return response.data;
    }
    static async createService(dto: ServiceCreateDto): Promise<any> {
      const response = await baseApi.post(`service/create`, dto, {
        headers: {
          'Content-Type': 'application/json',
        } 
      });
      return response.data;
    }
    static async getMyServices(id: string): Promise<any> {
      const response = await baseApi.get(`service/customer/${id}`);
      return response.data;
    }
    static async getWorkerServices(id: string): Promise<any> {
      const response = await baseApi.get(`service/worker/${id}`);
      return response.data;
    }
    static async getAllWorkerService(): Promise<any> {
      const response = await baseApi.get(`service/worker/all`);
      return response.data;
    }
}
export default ServiceService