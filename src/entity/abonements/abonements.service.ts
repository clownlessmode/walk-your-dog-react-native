import { baseApi } from "@shared/api/base.api";
import { AbonementBuyDto, AbonementBuyRo, AbonementDto } from "./modal/abonements.interface";

class AbonementsService {
    static async getAbonementsUs(id: string): Promise<any> {
      const response = await baseApi.get<AbonementDto[]>(`abonements/by/${id}`);
      return response.data;
    }
    static async getAllAbonementsUs(): Promise<any> {
      const response = await baseApi.get('abonements/');
      return response.data;
    }
    static async postAbonementsUs(data: AbonementBuyDto): Promise<AbonementBuyRo> {
      const response = await baseApi.post('abonements/buy', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    }
  }
  
  export default AbonementsService;