import { baseApi } from '../../shared/api/base.api';
import { PetParametersDto } from './model/pet-parameters.interface';
import { Pet } from './model/pet.interface';

class PetService {
  static async postSignUpPet(formData: any): Promise<any> {
    const response = await baseApi.post('pets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
  static async getPets(id: string): Promise<any> {
    const response = await baseApi.get<Pet[]>(`pets/by/${id}`);
    return response.data;
  }
  static async deletePets(id: string): Promise<any> {
    const response = await baseApi.delete<Pet[]>(`pets/${id}`);
    return response.data;
  }
  static async putPets(id: string, dto: PetParametersDto): Promise<any> {
    const response = await baseApi.put<Pet[]>(`pets/parameters/form/${id}`, dto);
    return response.data;
  }
}

export default PetService;
