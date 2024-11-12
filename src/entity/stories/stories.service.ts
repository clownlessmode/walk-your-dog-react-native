import { baseApi } from "../../shared/api/base.api";
import Story from "./model/stories.interface";

class StoriesService {
    static async getStories():Promise<Story[]>{
        const response = await baseApi.get<Story[]>("stories")
        return response.data
    }
}

export default StoriesService;