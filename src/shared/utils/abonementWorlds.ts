import { getDeclinedWord } from './declension';

export function abonementWorlds(type: string, count: number): string {
  switch (type) {
    case 'WALKING':
      return getDeclinedWord(count, ['Прогулка', 'Прогулки', 'Прогулок']);
    case 'TRAINING':
      return getDeclinedWord(count, [
        'Тренировка с кинологом',
        'Тренировки с кинологом',
        'Тренировок с кинологом',
      ]);
    // Добавьте здесь новые типы по мере необходимости
    default:
      return type;
  }
}
