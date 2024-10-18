import { baseApi } from "../../shared/api/base.api";
import PetTypes from "./model/pet-types.interface";

class PetTypesService {
  static async getPetTypes(): Promise<PetTypes[]> {
    const response = await baseApi.get<PetTypes[]>("pet-types");
    return response.data;
  }
}

export default PetTypesService;
