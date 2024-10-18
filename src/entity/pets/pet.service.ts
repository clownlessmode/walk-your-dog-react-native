import { baseApi } from '../../shared/api/base.api';
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
}

export default PetService;
