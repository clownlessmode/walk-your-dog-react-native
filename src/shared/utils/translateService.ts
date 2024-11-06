export const SERVICE_TRANSLATIONS: { [key: string]: string } = {
    walking: 'Выгул',
    washPaws: 'Помыть лапы',
    feed: 'Покормить',
    babysitter: 'Няня',
    sitter: 'Ситтер',
    training: 'Дрессировка',
    grooming: 'Грумминг'
  };

  export const translateService = (serviceName: string): string => {
    return SERVICE_TRANSLATIONS[serviceName] || serviceName;
  };