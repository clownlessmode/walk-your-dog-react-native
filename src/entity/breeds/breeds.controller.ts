import {useQueryClient, useQuery} from "@tanstack/react-query"
import BreedsService from "./breeds.service"


export const useBreedsController = (id?: string) => {
    const queryClient = useQueryClient()
    const breedsByPetTypeQuery = useQuery({
        queryKey: ['breeds', id],
        queryFn: () => BreedsService.getBreedsByPetType(id as string),
        enabled: !!id,
    })
    return {breedsByPetType: breedsByPetTypeQuery.data, isBreedsLoading: breedsByPetTypeQuery.isLoading, breedsError: breedsByPetTypeQuery.error}
    
}