import { baseApi } from "../../shared/api/base.api";
import Breeds from "./model/breeds.interface";

class BreedsService {
  static async getBreedsByPetType(id: string): Promise<Breeds[]> {
    const response = await baseApi.get<Breeds[]>(`breeds/by/02170d15-1b32-4ce6-af4b-d524e016f394`);
    return response.data;
  }
}

export default BreedsService;
