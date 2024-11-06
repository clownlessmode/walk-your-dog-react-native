import { baseApi } from "@shared/api/base.api";
import { ReminderDto, ReminderRo } from "./model/reminders.interface";

class ReminderService {
    static async postReminder(dto: ReminderDto): Promise<ReminderRo> {
      const response = await baseApi.post<ReminderRo>('reminders', dto);
      return response.data;
    }
}

export default ReminderService;