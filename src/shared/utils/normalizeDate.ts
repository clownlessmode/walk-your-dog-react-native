import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parseISO,
} from 'date-fns';

export default function normalizeData(created: string): string {
  const createdAt = parseISO(created);
  const now = new Date();
  const years = differenceInYears(now, createdAt);
  const months = differenceInMonths(now, createdAt) % 12;
  const days = differenceInDays(now, createdAt) % 30;

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'год' : 'года'}`);
  }

  if (months > 0) {
    parts.push(
      `${months} ${months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев'}`
    );
  }

  if (days > 0 || (years === 0 && months === 0)) {
    parts.push(`${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`);
  }

  return parts.join(', ');
}
