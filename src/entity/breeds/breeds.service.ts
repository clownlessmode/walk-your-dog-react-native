import { baseApi } from "../../shared/api/base.api";
import Breeds from "./model/breeds.interface";

class BreedsService {
  static async getBreedsByPetType(id: string): Promise<Breeds[]> {
    const response = await baseApi.get<Breeds[]>(`breeds/by/${id}`);
    return response.data;
  }
}

export default BreedsService;
