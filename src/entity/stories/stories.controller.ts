import {useQueryClient, useQuery} from "@tanstack/react-query"
import StoriesService from "./stories.service"


export const useStoriesController = () => {
    const queryClient = useQueryClient()
    const storiesQuery = useQuery({
        queryKey: ['stories'],
        queryFn: StoriesService.getStories
    })
    return {stories: storiesQuery.data, isStoriesLoading: storiesQuery.isLoading, storiesError: storiesQuery.error}
    
}