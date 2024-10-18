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

export const useAuthController = () => {
  const queryClient = useQueryClient();
  const preAuthMutation = useMutation<PreAuthRo, Error, PreAuthDto>({
    mutationFn: AuthService.postPreAuth,
  });
  const verifyCode = useMutation<VerifyCodeRo, Error, VerifyCodeDto>({
    mutationFn: AuthService.postVerifyCode,
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
    signUp: signUp.mutateAsync,
    error: preAuthMutation.error || verifyCode.error,
    isAuthLoading:
      preAuthMutation.isPending || verifyCode.isPending || signUp.isPending,
  };
};
