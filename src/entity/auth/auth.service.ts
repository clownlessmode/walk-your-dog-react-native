import { baseApi } from '../../shared/api/base.api';
import {
  PreAuthDto,
  PreAuthRo,
  SignUpDto,
  SignUpRo,
  VerifyCodeDto,
  VerifyCodeRo,
} from './model/auth.interface';

class AuthService {
  static async postPreAuth(dto: PreAuthDto): Promise<PreAuthRo> {
    const response = await baseApi.post<PreAuthRo>('auth/preauth', dto);
    return response.data;
  }
  static async postVerifyCode(dto: VerifyCodeDto): Promise<any> {
    const response = await baseApi.post<VerifyCodeRo>('auth/verify-code', dto);
    return response.data;
  }
  static async postSignUp(formData: any): Promise<SignUpRo> {
    const response = await baseApi.post('auth/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export default AuthService;
