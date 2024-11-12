import { useQuery, useQueryClient } from "@tanstack/react-query";
import PetServiceService from "./pet-service.service";

export const usePetServiceController = (id?: string) => {
    const queryClient = useQueryClient();
    const getPetService = useQuery({
      queryKey: ['petService', id],
      queryFn: () => PetServiceService.getPetService(id as string),
      enabled: !!id,
    });
    return {
        getPetService: getPetService.data,
    loadPetService: getPetService.isLoading,
    }
}