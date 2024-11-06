import { baseApi } from "@shared/api/base.api";
import { AdressesDto, AdressesRo } from "./model/adresses.interface";


class AdressesService {
    static async postAdresses(dto: AdressesDto): Promise<AdressesRo> {
      const response = await baseApi.post<AdressesRo>('adresses', dto);
      return response.data;
    }
}

export default AdressesService;