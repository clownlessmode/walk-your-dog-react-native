import { baseApi } from "../../shared/api/base.api";
import { Vaccines } from "./model/vaccines.interface";

class VaccinesService {
  static async getVaccines(): Promise<Vaccines[]> {
    const response = await baseApi.get<Vaccines[]>("vaccines");
    return response.data;
  }
}

export default VaccinesService;
