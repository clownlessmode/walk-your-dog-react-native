import {useQueryClient, useQuery} from "@tanstack/react-query"
import VaccinesService from "./vaccines.services"


export const useVaccinesController = () => {
    const queryClient = useQueryClient()
    const vaccinesQuery = useQuery({
        queryKey: ['vaccines'],
        queryFn: VaccinesService.getVaccines
    })
    return {vaccines: vaccinesQuery.data, isVaccinesLoading: vaccinesQuery.isLoading, vaccinesError: vaccinesQuery.error}
    
}