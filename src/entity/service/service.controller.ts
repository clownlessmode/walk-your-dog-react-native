import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceService from "./service.service";
import { ServiceCreateDto, ServiceCreateRo} from "./model/service.interface";
import { AxiosError } from "axios";
interface ApiError {
  message: string[];
  error: string;
  statusCode: number;
}
export const useServiceController = (id?: string) => {
  const queryClient = useQueryClient();
    const getService = useQuery({
        queryKey: ['allServices'],
        queryFn: () => ServiceService.getServiceCatalog(),
      });
      const postService = useMutation<ServiceCreateRo, AxiosError<ApiError>, ServiceCreateDto>({
        mutationFn: ServiceService.createService,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['myServices'],
          });
          queryClient.invalidateQueries({
            queryKey: ['allServices'],
          });
        },
        onError: (error: AxiosError<ApiError>) => {
          if (error.response && error.response.data) {
            const apiError = error.response.data;
            console.error('Произошла ошибка:', apiError.message);
          } else {
            console.error('Ошибка:', error.message);
          }
        },
      });
      const getMyServices = useQuery<ServiceCreateRo[]>({
        queryKey: ['myServices', id],
        queryFn: () => ServiceService.getMyServices(id as string),
        refetchInterval: 5000, 
        enabled: !!id
      });
      const getWorkerServices = useQuery<ServiceCreateRo[]>({
        queryKey: ['myServices', id],
        queryFn: () => ServiceService.getWorkerServices(id as string),
        refetchInterval: 5000, 
        enabled: !!id
      });
      const getAllWorkerService = useQuery({
        queryKey: ['myServices'],
        queryFn: () => ServiceService.getAllWorkerService(),
      });
      
      return {
        allService: getService.data,
        isLoadService: getService.isLoading,
        createService: postService.mutateAsync,
        isLoadingCreateServices: postService.isPending,
        errorCreateServices: postService.error,
        isErrorCreateServices: postService.isError,
        getMyServices: getMyServices.data,
        loadingMyServices: getMyServices.isLoading,
        workerService: getWorkerServices.data,
        isLoadingWorkerServices: getWorkerServices.isLoading,
        getAllWorkerService: getAllWorkerService.data,
        isLoadingAllWorkerService: getAllWorkerService.isLoading
      }
}
