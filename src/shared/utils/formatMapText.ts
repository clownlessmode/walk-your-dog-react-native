const formatMapText = (mapText: string | undefined) => {
    if (!mapText) return ''; // Если map не определен, вернуть пустую строку

    // Разделяем строку по запятой
    const parts = mapText.split(',');

    // Если есть хотя бы одна запятая, берем текст после первой запятой
    const remainingText =
      parts.length > 1 ? parts.slice(1).join(',').trim() : mapText;

    // Обрезаем текст до 10 символов и добавляем "..." если больше 10 символов
    return remainingText.length > 10
      ? `${remainingText.slice(0, 20)}...`
      : remainingText;
  };
  export default formatMapText