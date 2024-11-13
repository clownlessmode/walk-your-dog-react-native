import {
  useQueryClient,
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import AuthService from "./auth.service";
import {
  PreAuthDto,
  PreAuthRo,
  SignUpDto,
  SignUpRo,
  VerifyCodeDto,
  VerifyCodeRo,
} from "./model/auth.interface";
import { Role } from "@entity/users/model/role.enum";
import { AxiosError } from "axios";
interface ApiError {
  message: string[];
  error: string;
  statusCode: number;
  success: boolean;
}
export const useAuthController = () => {
  const queryClient = useQueryClient();
  const preAuthMutation = useMutation<PreAuthRo, Error, PreAuthDto>({
    mutationFn: AuthService.postPreAuth,
  });
  const verifyCode = useMutation<VerifyCodeRo, AxiosError<ApiError>, VerifyCodeDto>({
    mutationFn: AuthService.postVerifyCode,
    onError: (error: AxiosError<ApiError>) => {
      if (error.response && error.response.data) {
        const apiError = error.response.data;
        console.error('Произошла ошибка:', apiError.message);
      } else {
        console.error('Ошибка:', error.message);
      }
    },
  });
  const signUp = useMutation<SignUpRo, Error, FormData>({
    mutationFn: AuthService.postSignUp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    }
  });

  return {
    preAuth: preAuthMutation.mutateAsync,
    verifyCode: verifyCode.mutateAsync,
    isVerifyError: verifyCode.isError,
    verifyError: verifyCode.error,
    signUp: signUp.mutateAsync,
    error: preAuthMutation.error || verifyCode.error,
    isAuthLoading:
      preAuthMutation.isPending || verifyCode.isPending || signUp.isPending,
  };
};
