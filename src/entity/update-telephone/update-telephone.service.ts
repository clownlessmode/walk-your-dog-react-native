import { baseApi } from '../../shared/api/base.api';
import { UpdateTelephoneDto, UpdateTelephoneRo, UpdateUserDto, UpdateUserRo } from './model/update-telephone.interface';


class UpdateTelephoneService {
  static async postUpdateTelephone(dto: UpdateTelephoneDto): Promise<UpdateTelephoneRo> {
    const response = await baseApi.post<UpdateTelephoneRo>('users/telephone/send-code', dto);
    return response.data;
  }
  static async patchUpdateUser(id: string, dto: UpdateUserDto): Promise<UpdateUserRo> {
    const response = await baseApi.patch<UpdateUserRo>(`users/telephone/update/${id}`, dto);
    return response.data;
  }
}

export default UpdateTelephoneService;
