import { useMutation, useQueryClient } from '@tanstack/react-query';
import ReminderService from './reminder.service';
import { ReminderDto, ReminderRo } from './model/reminders.interface';

export const useReminderController = () => {
  const queryClient = useQueryClient();
  const reminder = useMutation<ReminderRo, Error, ReminderDto>({
    mutationFn: ReminderService.postReminder,
  });

  return {
    createReminder: reminder.mutateAsync,
  };
};
