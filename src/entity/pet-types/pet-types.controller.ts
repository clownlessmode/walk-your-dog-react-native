import {useQueryClient, useQuery} from "@tanstack/react-query"
import PetTypesService from "./pet-types.service"


export const usePetTypesController = () => {
    const queryClient = useQueryClient()
    const petTypesQuery = useQuery({
        queryKey: ['pet-types'],
        queryFn: PetTypesService.getPetTypes
    })
    return {petTypes: petTypesQuery.data, isPetTypesLoading: petTypesQuery.isLoading, petTypesError: petTypesQuery.error}
    
}