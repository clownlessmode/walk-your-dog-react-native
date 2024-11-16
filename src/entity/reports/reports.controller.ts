import { QueryClient, useMutation } from "@tanstack/react-query";
import ReportService from "./reports.service";
import { AxiosError } from "axios";
interface ApiError {
    message: string[];
    error: string;
    statusCode: number;
  }
export const useReportController = (serviceId?: string) => {
    const queryClient = new QueryClient();
    const postReportAttach = useMutation<any, AxiosError<ApiError>, {serviceId: string}>({
        mutationKey: ['reportsAttach', serviceId],
        mutationFn: ({serviceId}) => ReportService.reportAttach(serviceId as string),
        onError: (error) => {
            console.error('Ошибка при обновлении пользователя:', error);
          },
      });
      const postReportClose = useMutation<any, AxiosError<ApiError>, {serviceId: string}>({
        mutationKey: ['reportsAttach', serviceId],
        mutationFn: ({serviceId}) => ReportService.reportClose(serviceId as string),
        onError: (error) => {
            console.error('Ошибка при обновлении пользователя:', error);
          },
      });
      return {
        reportAttach: postReportAttach.mutateAsync,
        loadingReportsAttach: postReportAttach.isPending,
        reportClose: postReportClose.mutateAsync,
        loadingReportsClose: postReportClose.isPending,
      }
}