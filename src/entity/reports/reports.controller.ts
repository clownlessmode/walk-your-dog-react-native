import { QueryClient, useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import ReportService from "./reports.service";
import { AxiosError } from "axios";
import { ServiceCreateRo } from "@entity/service/model/service.interface";
import { ReportRo, ReportsDto } from "./model/reports.interface";
interface ApiError {
    message: string[];
    error: string;
    statusCode: number;
  }
export const useReportController = (id?: string) => {
    const queryClient = new QueryClient();
    const postReportAttach = useMutation<ReportRo, AxiosError<ApiError>, ReportsDto>({
        mutationKey: ['reportsAttach', id],
        mutationFn: (dto: ReportsDto) => ReportService.reportAttach(id as string, dto),
        onError: (error) => {
            console.error('Ошибка при обновлении пользователя:', error);
          },
      });
      const postReportClose = useMutation<any, AxiosError<ApiError>, {id: string}>({
        mutationKey: ['reportsClose', id],
        mutationFn: ({id}) => ReportService.reportClose(id as string),
        onError: (error) => {
            console.error('Ошибка при обновлении пользователя:', error);
          },
      });
      const getReportWaiting= useQuery<ServiceCreateRo[], Error, ServiceCreateRo[], [string, string | undefined]>({
        queryKey: ['reportWaiting', id],
        queryFn: () => ReportService.reportWaiting(id as string),
        refetchInterval: 5000,
        enabled: !!id,
        keepPreviousData: true,
      } as UseQueryOptions<ServiceCreateRo[], Error, ServiceCreateRo[], [string, string | undefined]>);
      return {
        reportAttach: postReportAttach.mutateAsync,
        loadingReportsAttach: postReportAttach.isPending,
        reportClose: postReportClose.mutateAsync,
        loadingReportsClose: postReportClose.isPending,
        reportWaiting: getReportWaiting.data,
      }
}