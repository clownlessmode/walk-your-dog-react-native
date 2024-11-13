export default function getReviewWord(count: string | number): string {
  // Преобразуем count в число, если это строка
  const numericCount = typeof count === 'string' ? parseInt(count, 10) : count;

  if (isNaN(numericCount)) {
    return 'Некорректное значение'; // Обработка некорректного значения
  }

  const mod10 = numericCount % 10;
  const mod100 = numericCount % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${numericCount} отзыв`;
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${numericCount} отзыва`;
  } else {
    return `${numericCount} отзывов`;
  }
}
