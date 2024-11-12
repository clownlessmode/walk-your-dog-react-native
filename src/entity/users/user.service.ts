import { baseApi } from "@shared/api/base.api";
import { User } from "./model/user.interface";

class UserService {
    static async getUser(id: string): Promise<any> {
        const response = await baseApi.get<User>(`users/${id}`);
        return response.data;
    }
    static async deleteUser(id: string): Promise<any> {
        const response = await baseApi.delete<User>(`users/${id}`);
        return response.data;
    }
}
export default UserService;