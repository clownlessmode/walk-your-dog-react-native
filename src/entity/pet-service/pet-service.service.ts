import { baseApi } from "@shared/api/base.api";
import { petServiceDto } from "./model/petService.interface";

class PetServiceService {
    static async getPetService(id: string): Promise<any> {
      const response = await baseApi.get<petServiceDto>(`service/pet/${id}`);
      return response.data;
    }
}
export default PetServiceService